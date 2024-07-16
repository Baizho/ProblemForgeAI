import "dotenv/config";
import express, { Request, Response } from "express";
import cors from 'cors';
import connectDB from "./db";
import geminiRouter from "./gemini/gemini-router";
import GeminiService from "./gemini/gemini-service";
import { activate_test } from "./api/activate_test";
import polygonAddProblemPuppeteer from "./polygon/polygon_full_puppeteer";
import polygonAddProblemApi from "./polygon/polygon_api";
import encodeurl from "encodeurl";

const app = express();
const geminiService = new GeminiService();

// Middleware setup
app.use(cors());
app.use(express.json());

// Database connection
// connectDB(); // Uncomment when you need to connect to the database

// Routes
app.use(geminiRouter);

// Generate Tests API
app.post("/generateTests", async (req: Request, res: Response) => {
  const { number, input, output } = req.body;
  try {
    const file_links = await activate_test(number.toString(), input, output);
    console.log("Tests generated successfully!");
    res.status(201).json({ file_links });
  } catch (err: any) {
    console.error("Error generating tests", err);
    res.status(500).json({ message: "Error generating tests", err });
  }
});

// Create Polygon problem using Puppeteer
app.post("/polygonAddProblemPuppeteer", async (req: Request, res: Response) => {
  const { title, statement, input, output, testInput, testOutput, notes, tests, user, sol, timeLimit, memoryLimit } = req.body;
  let solution: string = sol || await geminiService.generateSolution(statement, input, output, testInput, testOutput, notes, timeLimit, memoryLimit);

  try {
    await polygonAddProblemPuppeteer(title, statement, input, output, testInput, testOutput, notes, tests, user, solution, timeLimit, memoryLimit);
    res.status(201).json({ message: "Problem created successfully!" });
  } catch (err: any) {
    console.error("Error creating problem", err);
    res.status(500).json({ message: "Error creating problem", err });
  }
});

// Create Polygon problem using API
app.post("/polygonAddProblemApi", async (req: Request, res: Response) => {
  // console.log(encodeURIComponent("//\ hello @#@  "));
  const { title, statement, input, output, testInput, testOutput, notes, tests, user, sol, timeLimit, memoryLimit, problemLanguage } = req.body;
  let solution: string = sol || await geminiService.generateSolution(statement, input, output, testInput, testOutput, notes, timeLimit, memoryLimit);

  try {
    await polygonAddProblemApi(title, statement, input, output, testInput, testOutput, notes, tests, user, solution, timeLimit, memoryLimit, problemLanguage);
    res.status(201).json({ message: "Problem created successfully!" });
  } catch (err: any) {
    console.error("Error creating problem with API", err);
    res.status(500).json({ message: "Error creating problem", err });
  }
});

// Root route
app.post("/", async (_req: Request, res: Response) => {
  res.status(201).json("It works!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
