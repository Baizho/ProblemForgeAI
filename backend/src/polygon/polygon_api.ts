import { v4 as uuid4 } from "uuid";
import GeminiService from "../gemini/gemini-service";
import axiosPolygonInstance from "./axiosInstance";

const api_key = process.env.CODEFORCES_POLYGON_KEY;
const api_secret = process.env.CODEFORCES_POLYGON_SECRET;

const geminiService = new GeminiService();

interface paramsProp {
    apiKey: string,
    time: number,
}


const createSignature = () => {
    const params = { apiKey: api_key, time: Math.floor(Date.now() / 1000) };
}

export default async function polygonAddProblemApi(title: string, statement: string, input: string, output: string, testInput: string, testOutput: string, notes: string, tests: string[], user: string, solution: string, timeLimit: number, memoryLimit: number) {
    console.log("Running polygon!");
    const checker = await geminiService.getChecker(output);

    // check authorization
    const res = axiosPolygonInstance.post("/problems.list", {
        apiKey: api_key,
        time: Date.now() / 1000,
        apiSig: createSignature(),
    })

}