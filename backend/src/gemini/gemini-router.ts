import { Router } from 'express';
import GeminiService from './gemini-service';
import GeminiController from './gemini-controller';
const geminiRouter = Router();

const geminiService = new GeminiService();
const geminiController = new GeminiController(geminiService);

geminiRouter.post("/generateProblem", geminiController.generateProblem);
geminiRouter.post("/generateSolution", geminiController.generateSolution);

export default geminiRouter;