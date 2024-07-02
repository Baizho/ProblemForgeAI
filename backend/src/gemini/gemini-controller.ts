import GeminiService from "./gemini-service";
import {Request, Response} from "express";


class GeminiController {
    private geminiService: GeminiService;
  
    constructor(geminiService: GeminiService) {
      this.geminiService = geminiService;
    }
    
    generateProblem = async (req: Request, res: Response): Promise<void> => {
        const {ideaPrompt} = req.body;
        try {
            // console.log("we are genearting?", this.geminiService);
            const result = await this.geminiService.generateProblem(ideaPrompt);
            res.status(201).json({message : JSON.parse(result)});
        } catch(err : any) {
            console.log("error generating problem", err);
            res.status(500).json({message : "error generating problem", err});
        }
    }
}

export default GeminiController;
  