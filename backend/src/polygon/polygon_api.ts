import { v4 as uuid4 } from "uuid";
import GeminiService from "../gemini/gemini-service";
import axiosPolygonInstance from "./axiosInstance";
import { sha512 } from "js-sha512";

const api_key = process.env.CODEFORCES_POLYGON_KEY;
const api_secret = process.env.CODEFORCES_POLYGON_SECRET;

const geminiService = new GeminiService();

interface paramsProp {
    apiKey: string,
    time: number,
}

interface apiParam {
    param: string,
    value: string,
}

interface problemProp {
    id: number,
    owner: string,
    name: string,
    deleted: boolean,
    favourite: false,
    accessType: string,
    revision: number,
    modified: boolean
}

const getLink = async (slug: string, request: apiParam[], api_key: string, api_secret: string) => {
    // console.log(request[1].value);
    for (let i = 0; i < request.length; i += 1) {
        for (let j = i + 1; j < request.length; j += 1) {
            if (request[i].param > request[j].param) {
                const temp = request[i];
                request[i] = request[j];
                request[j] = temp;
            } else if (request[i].param === request[j].param && request[i].value > request[j].value) {
                const temp = request[i];
                request[i] = request[j];
                request[j] = temp;
            }
        }
    }
    let link = slug;
    let hash = "123456" + slug;
    request.map((req, index) => {
        if (index > 0) hash += "&", link += "&";
        hash += req.param + "=" + req.value;
        link += req.param + "=" + req.value;
    });
    hash += "#" + api_secret;
    const hash_link = hash;
    hash = sha512(hash);
    // console.log("the hash ", hash_link, hash);
    link += "&apiSig=123456" + hash;
    // console.log(link, hash);
    return link;
}

export default async function polygonAddProblemApi(title: string, statement: string, input: string, output: string, testInput: string, testOutput: string, notes: string, tests: string[], user: string, solution: string, timeLimit: number, memoryLimit: number) {
    console.log("Running polygon!");
    const checker = await geminiService.getChecker(output);

    if (!api_key || !api_secret) return;
    // check authorization
    const problem: problemProp = await createNewProblem(title, api_key, api_secret);
    await updateConstraints(problem.id, timeLimit, memoryLimit, api_key, api_secret);


}

async function createNewProblem(title: string, api_key: string, api_secret: string) {
    try {
        const problemName = 'problem-' + title.replace(" ", "-").toLowerCase() + "-" + uuid4();
        // console.log(problemName, api_key, api_secret);
        const link = await getLink("/problem.create?", [{ param: "apiKey", value: api_key }, { param: "time", value: Math.round(Date.now() / 1000).toString() }, { param: "name", value: problemName }], api_key, api_secret);
        const res = await axiosPolygonInstance.get(link);
        return res.data.result;
    } catch (err: any) {
        console.log("There was an error creating new problem using api", err);
    }
}

async function updateConstraints(id: number, timeLimit: number, memoryLimit: number, api_key: string, api_secret: string) {
    try {
        const link = await getLink("/problem.updateInfo?", [{ param: "apiKey", value: api_key }, { param: "time", value: Math.round(Date.now() / 1000).toString() }, { param: "problemId", value: id.toString() }, { param: "timeLimit", value: timeLimit.toString() }, { param: "memoryLimit", value: memoryLimit.toString() }], api_key, api_secret);
        await axiosPolygonInstance.get(link);
    } catch (err: any) {
        console.log("There is an error updating contraints", err);
    }
}

async function getProblemById(id: number, api_key: string, api_secret: string) {
    try {
        const link = await getLink("/problems.list?", [{ param: "apiKey", value: api_key }, { param: "time", value: Math.round(Date.now() / 1000).toString() }, { param: "id", value: id.toString() }], api_key, api_secret);
        const res = await axiosPolygonInstance.get(link);
        return res.data;
    } catch (err: any) {
        console.log("There is an error getting problem by id", err);
    }
}