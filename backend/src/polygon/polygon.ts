import puppeteer, { Page } from "puppeteer";
import { v4 as uuid4 } from "uuid";
import GeminiService from "../gemini/gemini-service";
import { getFileFromS3 } from "../api/activate_test";
import * as path from 'path';
import fs from "fs/promises";
import fs1 from "fs";
import util from 'util'

const polygon_password = process.env.POLYGON_PASSWORD;
const polygon_username = process.env.POLYGON_USERNAME;

const geminiService = new GeminiService();

function fix(str: string) {
    let res: string = "";
    for (let i = 0; i < str.length; i += 1) {
        res += str[i];
        if (str[i] === '{') res += ' ';
    }
    return res;
}


export default async function polygonAddProblem(title: string, statement: string, input: string, output: string, testInput: string, testOutput: string, notes: string, tests: string[], user: string, solution: string) {
    // console.log(solution);
    const checker = await geminiService.getChecker(output);

    const browser = await puppeteer.launch({ headless: false });
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://polygon.codeforces.com/login");

    const ccid = await beginAuthentication(page);

    const problemName = await createNewProblem(page, user);

    await startEditSession(page, problemName);

    await addStatement(page, "english", title, statement, input, output, notes);

    await setChecker(page, output, checker);

    await addTests(page, testInput, tests);

    await addSolution(page, fix(solution));

    await addUser(page, user);

    await commitChanges(page);

    browser.close();
}

async function beginAuthentication(page: Page) {
    try {
        // login the user
        await page.setViewport({ width: 1080, height: 1024 });

        // await page.waitForSelector('input[name="login"]');
        if (!polygon_username || !polygon_password) return;
        await page.locator('input[name="login"]').fill(polygon_username);

        // await page.waitForSelector('input[type="password"]', { visible: true });  
        await page.locator('input[name="password"]').fill(polygon_password);

        // await page.locator('input[name="attachSessionToIp"]').click();

        // await page.waitForSelector('input[type="submit"]');
        await page.locator('input[name="submit"]').click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        let ccid = "", length = page.url().length;
        for (let i = length - 1; i >= 0; i--) {
            const c = page.url()[i];
            if (c === '=') break;
            ccid += c;
        }
        return ccid;
    } catch (err: any) {
        console.log("Error in authorization page", err);
        return "error in authorization page";
    }
}

async function createNewProblem(page: Page, user: string) {
    try {
        // Create new problem
        await page.$$eval('a', links => {
            links.find(link => link.textContent === 'New Problem')?.click();
        });
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // Create problem Form
        const problemName = 'problem-' + user.toLowerCase() + "-" + uuid4();
        await page.locator(".createProblemName").fill(problemName);
        await page.locator('input[name="submit"]').click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        return problemName;
    } catch (err: any) {
        console.log("Error in create new problem", err);
        return "";
    }
}

async function startEditSession(page: Page, problemName: string) {
    try {
        // just start the edit session
        await page.locator(`tr[problemname="${problemName}"] a.START_EDIT_SESSION`).click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

    } catch (err: any) {
        console.log("error in start edit session", err);
    }
}

async function addStatement(page: Page, language: string, title: string, statement: string, input: string, output: string, notes: string) {
    try {
        // if there is initally no statemnts
        await page.locator(`text/None`).click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // select our language and create it
        await page.select("#expLang", language);
        await page.locator('input[type="submit"]').click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // add statements
        await page.locator('input[name="name"]').fill(title);
        await page.locator('textarea[name="legend"]').fill(statement);
        await page.locator('textarea[name="input"]').fill(input);
        await page.locator('textarea[name="output"]').fill(output);
        await page.locator('textarea[name="notes"]').fill(notes);
        // save it
        await page.locator('#save-statement-form-submit-button').click();
        await page.waitForNetworkIdle();
    } catch (err: any) {
        console.log("error in adding statement");
    }
}

async function setChecker(page: Page, output: string, checker: string) {
    try {
        // navigate to checker page using None, because it is the first None now that there are statements
        await page.locator(`text/None`).click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // select our checker and place it  
        await page.select("#fileSelect", checker);
        await page.waitForNetworkIdle();
        await page.locator('#fileSubmit').click();
        await page.waitForNetworkIdle();
    } catch (err: any) {
        console.log("error in set checker", err);
    }
}


async function addTests(page: Page, testInput: string, tests: string[]) {
    try {
        // find the test page
        await page.locator(`a[title="Please, add tests"]`).click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // add Test
        await page.locator("#add-test").click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // add sample
        await page.locator('textarea[name="testInput"]').fill(testInput);
        await page.locator('#testUseInStatements').click();
        await page.locator('input[type="submit"][name="Create"]').click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // Click to show the form
        await page.locator("#show-add-test-from-file-form").click();
        await page.waitForNetworkIdle();

        // Upload file
        const outputDirectory = path.join(process.cwd());
        const filePath = path.join(outputDirectory, tests[0]);
        const fileInput = await page.$('input[name="testFile"]');

        const file_links: string[] = [];
        async function run() {
            await Promise.all(tests.map(async (link, index) => {
                const fileContent = await getFileFromS3(link);
                // console.log("the link", link);
                const filePath = `${outputDirectory}/link_test${index}.txt`;
                await fs.writeFile(filePath, fileContent)
                file_links.push(filePath);
            }));
            await fileInput?.uploadFile(...file_links);
        }
        await run();

        // Wait for and click the submit button
        await page.$$eval(`input`, inputs => {
            for (const input of inputs) {
                if (input.value === "Send") {
                    input.click();
                }
            }
        })
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        file_links.map((link, index) => {
            fs1.unlinkSync(link);
        })
    } catch (err: any) {
        console.log("error in addTests", err);
    }
}

async function addSolution(page: Page, solution: string) {
    try {
        // find the solution page
        await page.locator(`a[title="Please, specify model (main correct) solution"]`).click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // new file and add name
        await page.locator('#new-solutions-file').click();
        await page.waitForNetworkIdle();
        await page.locator('input[name="file_name"]').fill("main.cpp");

        await page.$$eval(`input`, inputs => {
            for (const input of inputs) {
                if (input.value === "Create File") {
                    input.click();
                }
            }
        })
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // place the solution
        await page.type('.ace_content', solution);
        await page.locator('#submit_0').click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

    } catch (err: any) {
        console.log("error in addSolution", err);
    }
}

async function addUser(page: Page, user: string) {
    if (!user) return;
    try {
        await page.$$eval('a', links => {
            links.find(link => link.textContent === 'Manage access')?.click();
        });
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        await page.locator('#add-user').click();
        await page.locator('#addUserFormInput').fill(user);
        await page.select('select[name="type"]', "Write");

        await page.$$eval(`input`, inputs => {
            for (const input of inputs) {
                if (input.value === "Add Users") {
                    input.click();
                }
            }
        })
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

    } catch (err: any) {
        console.log("errir in adding user", err);
    }
}

async function commitChanges(page: Page) {
    try {
        await page.$$eval(`a`, as => {
            for (const a of as) {
                if (a.textContent === "Commit Changes") {
                    a.click();
                }
            }
        })
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        await page.locator('input[name="Commit"]').click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
    } catch (err: any) {
        console.log("error comitting changes", err);
    }
}