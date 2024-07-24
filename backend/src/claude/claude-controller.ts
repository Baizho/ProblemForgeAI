import { Request, Response } from "express";
import ClaudeService from "./claude-service"; // Import ClaudeService

class ClaudeController {
    private claudeService: ClaudeService;

    constructor(claudeService: ClaudeService) {
        this.claudeService = claudeService;
    }

    generateProblem = async (req: Request, res: Response): Promise<void> => {
        const { ideaPrompt, problemTopic, problemLevel, problemLanguage } = req.body;
        try {
            // Call the ClaudeService's generateProblem method
            const result = await this.claudeService.generateProblem(ideaPrompt, problemTopic, problemLevel, problemLanguage);
            res.status(201).json({ message: JSON.parse(result) });
        } catch (err: any) {
            console.log("error generating problem", err);
            res.status(500).json({ message: "error generating problem", err });
        }
    }

    generateSolution = async (req: Request, res: Response): Promise<void> => {
        const { statement, input, output, testInput, testOutput, notes, timeLimit, memoryLimit, userLang } = req.body;
        try {
            // Call the ClaudeService's generateSolution method
            const result = await this.claudeService.generateSolution(statement, input, output, testInput, testOutput, notes, timeLimit, memoryLimit, userLang);
            res.status(201).json({ message: result });
        } catch (err: any) {
            console.log("error generating solution", err);
            res.status(500).json({ message: "error generating solution", err });
        }
    }
}

export default ClaudeController;
