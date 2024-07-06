import "dotenv/config";
import express from "express";
import connectDB from "./db";
import { Response, Request } from "express";
import cors from 'cors';
import geminiRouter from "./gemini/gemini-router";
import GeminiService from "./gemini/gemini-service";
import { activate_test } from "./api/activate_test";
import polygonAddProblemPuppeteer from "./polygon/polygon_full_puppeteer";
import polygonAddProblemApiPuppeteer from "./polygon/polygon_api_puppeteer";

const geminiService = new GeminiService();

const app = express();
app.use(cors());
app.use(express.json());

// connectDB();

// async function runIT() {
//   const res = await activate_test("1");
//   console.log(res);
// }

// runIT();

// gemini

app.use(geminiRouter);

// generate Test api
app.post("/generateTests", async (req: Request, res: Response) => {
  const { number, input, output } = req.body;
  try {
    const file_links = await activate_test(number.toString(), input, output);
    console.log("Tests generated succesfully!");
    res.status(201).json({ file_links: file_links });
  } catch (err: any) {
    console.log("error generating tests", err);
    res.status(500).json({ message: "error generating tests", err });
  }
})

// create polygon problem using puppeteer
app.post("/polygonAddProblemPuppeteer", async (req: Request, res: Response) => {
  const { title, statement, input, output, testInput, testOutput, notes, tests, user, sol } = req.body;
  let solution: string = "";
  if (sol) solution = sol;
  else solution = solution = await geminiService.generateSolution(statement, input, output, testInput, testOutput, notes);
  try {
    const file_link = await polygonAddProblemPuppeteer(title, statement, input, output, testInput, testOutput, notes, tests, user, solution);
    res.status(201).json({ message: "success?" });

  } catch (err: any) {
    console.log("error creating problem", err);
    res.status(500).json({ message: "error creating problem", err });
  }
})

app.post("/polygonAddProblemApiPuppeteer", async (req: Request, res: Response) => {
  const { title, statement, input, output, testInput, testOutput, notes, tests, user, sol } = req.body;
  let solution: string = "";
  if (sol) solution = sol;
  else solution = solution = await geminiService.generateSolution(statement, input, output, testInput, testOutput, notes);
  try {
    const file_link = await polygonAddProblemApiPuppeteer(title, statement, input, output, testInput, testOutput, notes, tests, user, solution);
    res.status(201).json({ message: "success?" });

  } catch (err: any) {
    console.log("error creating problem", err);
    res.status(500).json({ message: "error creating problem", err });
  }
})

app.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});
