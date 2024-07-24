import { readableStreamAsyncIterable } from "openai/streaming";
import GeminiService from "./gemini-service";
import { Request, Response } from "express";


class GeminiController {
    private geminiService: GeminiService;

    constructor(geminiService: GeminiService) {
        this.geminiService = geminiService;
    }

    generateProblem = async (req: Request, res: Response): Promise<void> => {
        const { ideaPrompt, problemTopic, problemLevel, problemLanguage } = req.body;
        try {
            // console.log("we are genearting?", this.geminiService);
            // console.log(typeof problemTopic, typeof problemLevel);
            const result = await this.geminiService.generateProblem(ideaPrompt, problemTopic, problemLevel, problemLanguage);
            res.status(201).json({ message: JSON.parse(result) });
        } catch (err: any) {
            console.log("error generating problem", err);
            res.status(500).json({ message: "error generating problem", err });
        }
    }

    generateSolution = async (req: Request, res: Response): Promise<void> => {
        const { statement, input, output, testInput, testOutput, notes, timeLimit, memoryLimit, userLang } = req.body;
        try {
            console.log("we are genearting?", this.geminiService);
            const result = await this.geminiService.generateSolution(statement, input, output, testInput, testOutput, notes, timeLimit, memoryLimit, userLang);
            // console.log(result);
            console.log("finished");
            res.status(201).json({ message: result });
        } catch (err: any) {
            console.log("error generating problem", err);
            res.status(500).json({ message: "error generating problem", err });
        }
    }
}

export default GeminiController;
