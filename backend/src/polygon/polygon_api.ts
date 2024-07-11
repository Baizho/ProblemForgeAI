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


const createSignature = () => {
    const params = { apiKey: api_key, time: Math.floor(Date.now() / 1000) };
}

const link = async (slug: string, request: apiParam[], api_key: string, api_secret: string) => {
    console.log(request[1].value);
    for (let i = 0; i < request.length; i += 1) {
        for (let j = i + 1; j < request.length; j += 1) {
            if (request[i] > request[j]) {
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
    hash = sha512(hash);
    link += "&apiSig=123456" + hash;
    console.log(link, hash);
    return link;
}

export default async function polygonAddProblemApi(title: string, statement: string, input: string, output: string, testInput: string, testOutput: string, notes: string, tests: string[], user: string, solution: string, timeLimit: number, memoryLimit: number) {
    console.log("Running polygon!", Math.round(Date.now() / 1000));
    const checker = await geminiService.getChecker(output);

    if (!api_key || !api_secret) return;
    // check authorization
    await createNewProblem(title, api_key, api_secret);

}

async function createNewProblem(title: string, api_key: string, api_secret: string) {
    const problemName = 'problem-' + title.replace(" ", "-").toLowerCase() + "-" + uuid4();
    console.log(problemName, api_key, api_secret);
    const res = await axiosPolygonInstance.get(await link("/problem.create?", [{ param: "apiKey", value: api_key }, { param: "time", value: Math.round(Date.now() / 1000).toString() }, { param: "name", value: problemName }], api_key, api_secret));
    console.log(res.data);
}