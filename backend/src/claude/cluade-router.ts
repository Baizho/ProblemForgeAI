import { Router } from 'express';
import ClaudeService from './claude-service'; // Import ClaudeService
import ClaudeController from './claude-controller'; // Import ClaudeController

const claudeRouter = Router();

const claudeService = new ClaudeService(); // Create an instance of ClaudeService
const claudeController = new ClaudeController(claudeService); // Create an instance of ClaudeController with ClaudeService

claudeRouter.post("/generateProblem", claudeController.generateProblem); // Route for generating problems
claudeRouter.post("/generateSolution", claudeController.generateSolution); // Route for generating solutions

export default claudeRouter;
