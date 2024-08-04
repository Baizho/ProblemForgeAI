import { v4 as uuid4 } from "uuid";
import GeminiService from "../gemini/gemini-service";
import axiosPolygonInstance from "./axiosInstance";
import { sha512 } from "js-sha512";

// const api_key = process.env.CODEFORCES_POLYGON_KEY;
// const api_secret = process.env.CODEFORCES_POLYGON_SECRET;

const geminiService = new GeminiService();

interface ParamsProp {
    apiKey: string;
    time: number;
}

interface ApiParam {
    param: string;
    value: string;
}

interface ProblemProp {
    id: number;
    owner: string;
    name: string;
    deleted: boolean;
    favourite: false;
    accessType: string;
    revision: number;
    modified: boolean;
}


interface responseProp {
    createdProblem: boolean,
    updatedConstraints: boolean,
    updatedStatement: boolean,
    updatedChecker: boolean,
    updatedSolution: boolean,
    updatedSample: boolean,
    updatedTests: boolean,
    commitedChanges: boolean,
    builtPackage: boolean
}

let result: responseProp = {
    createdProblem: false,
    updatedConstraints: false,
    updatedStatement: false,
    updatedChecker: false,
    updatedSolution: false,
    updatedSample: false,
    updatedTests: false,
    commitedChanges: false,
    builtPackage: false
};

const sortApiParams = (params: ApiParam[]): ApiParam[] => {
    return params.sort((a, b) => {
        if (a.param > b.param) return 1;
        if (a.param < b.param) return -1;
        if (a.value > b.value) return 1;
        if (a.value < b.value) return -1;
        return 0;
    });
};

const getLink = async (slug: string, request: ApiParam[], apiKey: string, apiSecret: string): Promise<string> => {
    const sortedParams = sortApiParams(request);
    let link = slug;
    let hash = "123456" + slug;

    sortedParams.forEach((req, index) => {
        if (index > 0) {
            hash += "&";
            link += "&";
        }
        hash += `${req.param}=${req.value}`;
        link += `${req.param}=${encodeURIComponent(req.value)}`;

    });

    hash += `#${apiSecret}`;
    const hashed = sha512(hash);
    link += `&apiSig=123456${hashed}`;

    return link;
};

export default async function polygonAddProblemApi(
    title: string,
    statement: string,
    input: string,
    output: string,
    engoutput: string,
    testInput: string,
    testOutput: string,
    notes: string,
    tests: string[],
    user: string,
    solution: string,
    timeLimit: number,
    memoryLimit: number,
    problemLanguage: string,
    userLang: string,
    apiKey: string,
    apiSecret: string
) {
    console.log("Running polygon!");

    const checker = await geminiService.getChecker(engoutput), api_key = apiKey, api_secret = apiSecret;
    if (!api_key || !api_secret) return;

    result = {
        createdProblem: false,
        updatedConstraints: false,
        updatedStatement: false,
        updatedChecker: false,
        updatedSolution: false,
        updatedSample: false,
        updatedTests: false,
        commitedChanges: false,
        builtPackage: false
    };

    try {
        const problem = await createNewProblem(title, api_key, api_secret);
        // console.log(problem);
        // const problem = { id: 370833 };
        if (problem) {
            await Promise.all([
                updateConstraints(problem.id, timeLimit, memoryLimit, api_key, api_secret),
                updateStatement(problem.id, title, statement, input, output, notes, problemLanguage, api_key, api_secret),
                updateChecker(problem.id, checker, api_key, api_secret),
                updateSolution(problem.id, solution, userLang, api_key, api_secret),
                updateSample(problem.id, testInput, testOutput, api_key, api_secret),
                updateTests(problem.id, tests, api_key, api_secret),
            ])
            console.log(problem);
            console.log(result);
            if (result.createdProblem && result.updatedChecker && result.updatedConstraints && result.updatedSample && result.updatedStatement && result.updatedSolution) {
                await commitChanges(problem.id, api_key, api_secret);
                await buildPackage(problem.id, api_key, api_secret);
            }
        }
        console.log("Polygon finished");
    } catch (err: any) {
        console.error("erorr happened in adding to polygon");
    }
    // console.log(result);
    return result;

}

async function buildPackage(id: number, apiKey: string, apiSecret: string) {
    try {
        const link = await getLink("/problem.buildPackage?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: Math.round(Date.now() / 1000).toString() },
            { param: "problemId", value: id.toString() },
            { param: "full", value: "false" },
            { param: "verify", value: "false" },

        ], apiKey, apiSecret);
        await axiosPolygonInstance.get(link);
        result.builtPackage = true;
    } catch (err: any) {
        result.builtPackage = false;
        console.log("There is an error in building a package", err);
    }
}

async function commitChanges(id: number, apiKey: string, apiSecret: string) {
    try {
        const link = await getLink("/problem.commitChanges?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: Math.round(Date.now() / 1000).toString() },
            { param: "problemId", value: id.toString() },
            { param: "minorChanges", value: "true" }
        ], apiKey, apiSecret);
        await axiosPolygonInstance.get(link);
        result.commitedChanges = true;
    } catch (err: any) {
        result.commitedChanges = false;
        console.log("There is an error in comitting changes", err);
    }
}

async function updateTests(id: number, tests: string[], apiKey: string, apiSecret: string) {
    try {
        let ok = 1, index = 0;
        for (const testInput of tests) {
            try {
                const link = await getLink("/problem.saveTest?", [
                    { param: "apiKey", value: apiKey },
                    { param: "time", value: Math.round(Date.now() / 1000).toString() },
                    { param: "problemId", value: id.toString() },
                    { param: "testset", value: "tests" },
                    { param: "testIndex", value: (index + 2).toString() },
                    { param: "testInput", value: testInput },
                ], apiKey, apiSecret);
                index++;
                await axiosPolygonInstance.get(link);
            } catch (err: any) {
                ok = 0;
                console.error("There was an error adding tests", err);
                break;
            }
        };
        if (ok) result.updatedTests = true;
        else result.updatedTests = false;
    } catch (err: any) {
        result.updatedTests = false;
        console.log("There was an error adding tests", err);
    }
}

async function updateSample(id: number, testInput: string, testOutput: string, apiKey: string, apiSecret: string) {
    try {
        const link = await getLink("/problem.saveTest?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: Math.round(Date.now() / 1000).toString() },
            { param: "problemId", value: id.toString() },
            { param: "testset", value: "tests" },
            { param: "testIndex", value: "1" },
            { param: "testInput", value: testInput },
            { param: "testUseInStatements", value: "true" }
        ], apiKey, apiSecret);

        await axiosPolygonInstance.get(link);
        result.updatedSample = true;
    } catch (err: any) {
        result.updatedSample = false;
        console.log("There was an error adding sample tests", err);
    }
}

async function createNewProblem(title: string, apiKey: string, apiSecret: string): Promise<ProblemProp | undefined> {
    try {
        let problemName = `latestproblem-${uuid4()}`;
        problemName = (problemName.length > 64 ? problemName.substring(0, 64) : problemName);
        const link = await getLink("/problem.create?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: Math.round(Date.now() / 1000).toString() },
            { param: "name", value: problemName }
        ], apiKey, apiSecret);
        const res = await axiosPolygonInstance.get(link);
        result.createdProblem = true;
        return res.data.result;
    } catch (err) {
        result.createdProblem = false;
        console.error("There was an error creating a new problem using API", err);
    }
}

async function updateConstraints(id: number, timeLimit: number, memoryLimit: number, apiKey: string, apiSecret: string): Promise<void> {
    try {
        const link = await getLink("/problem.updateInfo?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: Math.round(Date.now() / 1000).toString() },
            { param: "problemId", value: id.toString() },
            { param: "timeLimit", value: timeLimit.toString() },
            { param: "memoryLimit", value: memoryLimit.toString() }
        ], apiKey, apiSecret);
        await axiosPolygonInstance.get(link);
        result.updatedConstraints = true;
    } catch (err) {
        result.updatedConstraints = false;
        console.error("There is an error updating constraints", err);
    }
}


async function updateStatement(
    id: number,
    title: string,
    statement: string,
    input: string,
    output: string,
    notes: string,
    problemLanguage: string,
    apiKey: string,
    apiSecret: string
): Promise<void> {
    try {
        const link = await getLink("/problem.saveStatement?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: Math.round(Date.now() / 1000).toString() },
            { param: "problemId", value: id.toString() },
            { param: "lang", value: problemLanguage },
            { param: "name", value: title },
            { param: "legend", value: statement },
            { param: "input", value: input },
            { param: "output", value: output },
            { param: "notes", value: notes }
        ], apiKey, apiSecret);
        await axiosPolygonInstance.get(link);
        result.updatedStatement = true;
    } catch (err) {
        result.updatedStatement = false;
        console.error("There is an error updating statement", err);
    }
}

async function updateChecker(id: number, checker: string, apiKey: string, apiSecret: string): Promise<void> {
    try {
        const link = await getLink("/problem.setChecker?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: Math.round(Date.now() / 1000).toString() },
            { param: "problemId", value: id.toString() },
            { param: "checker", value: checker },
        ], apiKey, apiSecret);
        await axiosPolygonInstance.get(link);
        result.updatedChecker = true;
    } catch (err: any) {
        result.updatedChecker = false;
        console.log("There is an error updating checker", err);
    }
}


async function updateSolution(id: number, solution: string, userLang: string, apiKey: string, apiSecret: string): Promise<void> {
    try {
        const link = await getLink("/problem.saveSolution?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: Math.round(Date.now() / 1000).toString() },
            { param: "problemId", value: id.toString() },
            { param: "name", value: `main.${userLang}` },
            { param: "file", value: solution }
        ], apiKey, apiSecret);
        await axiosPolygonInstance.get(link);
        result.updatedSolution = true;
    } catch (err: any) {
        result.updatedSolution = false;
        console.log("There is an error updating solution", err);
    }
}

async function getProblemById(id: number, apiKey: string, apiSecret: string): Promise<any> {
    try {
        const link = await getLink("/problems.list?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: Math.round(Date.now() / 1000).toString() },
            { param: "id", value: id.toString() }
        ], apiKey, apiSecret);
        const res = await axiosPolygonInstance.get(link);
        return res.data;
    } catch (err) {
        console.error("There is an error getting problem by id", err);
    }
}
