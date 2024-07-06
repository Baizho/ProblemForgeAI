import { v4 as uuid4 } from "uuid";
import GeminiService from "../gemini/gemini-service";
import axiosPolygonInstance from "./axiosInstance";

const api_key = process.env.CODEFORCES_POLYGON_KEY;
const api_secret = process.env.CODEFORCES_POLYGON_SECRET;

const geminiService = new GeminiService();

const params = {

}

const createSignature = () => {

}

export default async function polygonAddProblemApiPuppeteer(title: string, statement: string, input: string, output: string, testInput: string, testOutput: string, notes: string, tests: string[], user: string, solution: string) {
    console.log("Running polygon!");
    const checker = await geminiService.getChecker(output);

    // check authorization
    const res = axiosPolygonInstance.post("/problems.list", {
        apiKey: api_key,
        time: Date.now() / 1000,
        apiSig: createSignature(),
    })

}