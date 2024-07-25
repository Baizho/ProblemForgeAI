import { v4 as uuid4 } from "uuid";
import axiosPolygonInstance from "./axiosInstance";
import { sha512 } from "js-sha512";


// const api_key = process.env.CODEFORCES_POLYGON_KEY;
// const api_secret = process.env.CODEFORCES_POLYGON_SECRET;

interface ParamsProp {
    apiKey: string;
    time: number;
}

interface ApiParam {
    param: string;
    value: any;
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

const sortApiParams = (params: ApiParam[]): ApiParam[] => {
    return params.sort((a, b) => {
        if (a.param > b.param) return 1;
        if (a.param < b.param) return -1;
        if (a.value > b.value) return 1;
        if (a.value < b.value) return -1;
        return 0;
    });
};

// const getLink = async (slug: string, request: ApiParam[], apiKey: string, apiSecret: string): Promise<string> => {
//     const sortedParams = sortApiParams(request);
//     let link = slug;
//     let hash = "123456" + slug;

//     sortedParams.forEach((req, index) => {
//         if (index > 0) {
//             hash += "&";
//             link += "&";
//         }
//         hash += `${req.param}=${btoa(req.value)}`;
//         link += `${req.param}=${btoa(req.value)}`;

//     });

//     hash += `#${apiSecret}`;
//     const hashed = sha512(hash);
//     link += `&apiSig=123456${hashed}`;

//     return link;
// };

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

    const res = await getProblemById(370833, apiKey, apiSecret);
    console.log(res);

    // const checker = await geminiService.getChecker(output), api_key = apiKey, api_secret = apiSecret;
    // if (!api_key || !api_secret) return;

    // const problem = await createNewProblem(title, api_key, api_secret);
    // // const problem = { id: 370833 };
    // if (problem) {
    //     await Promise.all([
    //         updateConstraints(problem.id, timeLimit, memoryLimit, api_key, api_secret),
    //         updateStatement(problem.id, title, statement, input, output, notes, problemLanguage, api_key, api_secret),
    //         updateChecker(problem.id, checker, api_key, api_secret),
    //         updateSolution(problem.id, solution, userLang, api_key, api_secret),
    //         updateSample(problem.id, testInput, testOutput, api_key, api_secret),
    //         updateTests(problem.id, tests, api_key, api_secret),
    //     ])
    //     await commitChanges(problem.id, api_key, api_secret);
    //     await buildPackage(problem.id, api_key, api_secret);
    // }

    // console.log("Polygon finished");
}

async function saveFile(type: string, file: string, sourceType: string, apiKey: string, apiSecret: string) {
    try {
        const link = await getLink("/problem.saveFile?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: Math.round(Date.now() / 1000).toString() },
            { param: "type", value: type },
            { param: "file", value: file },
            { param: "sourceType", value: sourceType }
        ], apiKey, apiSecret)

        await axiosPolygonInstance.get(link);
    } catch (err: any) {
        console.log(`there was an error in saving file of type ${type}`, err);
    }
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
    } catch (err: any) {
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
    } catch (err: any) {
        console.log("There is an error in comitting changes", err);
    }
}

async function updateTests(id: number, tests: string[], apiKey: string, apiSecret: string) {
    try {
        tests.forEach(async (testInput, index) => {
            const link = await getLink("/problem.saveTest?", [
                { param: "apiKey", value: apiKey },
                { param: "time", value: Math.round(Date.now() / 1000).toString() },
                { param: "problemId", value: id.toString() },
                { param: "testset", value: "tests" },
                { param: "testIndex", value: (index + 2).toString() },
                { param: "testInput", value: testInput },
            ], apiKey, apiSecret);

            await axiosPolygonInstance.get(link);
        });
    } catch (err: any) {
        console.log("There was an error adding sample tests", err);
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
    } catch (err: any) {
        console.log("There was an error adding sample tests", err);
    }
}

async function createNewProblem(title: string, apiKey: string, apiSecret: string): Promise<ProblemProp | undefined> {
    try {
        let problemName = `${title.replace(/[^a-zA-Z]/g, "").replace(/\s+/g, "-").toLowerCase()}-${uuid4()}`;
        problemName = (problemName.length > 64 ? problemName.substring(0, 64) : problemName);
        const link = await getLink("/problem.create?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: Math.round(Date.now() / 1000).toString() },
            { param: "name", value: problemName }
        ], apiKey, apiSecret);
        const res = await axiosPolygonInstance.get(link);
        return res.data.result;
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err: any) {
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
    } catch (err: any) {
        console.log("There is an error updating solution", err);
    }
}

async function getProblemById(id: number, apiKey: string, apiSecret: string): Promise<any> {
    try {
        const time = Math.round(Date.now() / 1000).toString();
        const link = await getLink("/problems.list?", [
            { param: "apiKey", value: apiKey },
            { param: "time", value: time },
            { param: "id", value: id.toString() }
        ], apiKey, apiSecret);
        // console.log(link);
        const res = await axiosPolygonInstance.get(link);
        return res.data;
    } catch (err) {
        console.error("There is an error getting problem by id", err);
    }
}
