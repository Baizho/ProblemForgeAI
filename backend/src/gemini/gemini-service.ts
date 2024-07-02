import ProblemDto from "./dtos/Problem.dto";
import { jsonrepair } from "jsonrepair";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const systemPrompt = `print two backslahes.
`

const genModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: systemPrompt, generationConfig:{"response_mime_type": "application/json"}});

class GeminiService {

    async generateProblem(ideaPrompt : string): Promise<string> {
        try {
            // console.log("you are generatig content!");
            const res = await genModel.generateContent(ideaPrompt);
            // console.log(res);
            const result = await res.response;
            // console.log(await result.text());
            return await jsonrepair(result.text());
            // return `{yolo: "hey"}`;
        } catch(err: any) {
            console.log("error generating content from gemini", err);
            return "error bruh";
        }
    }
}

export default GeminiService