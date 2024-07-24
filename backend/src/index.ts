import "dotenv/config";
import express, { Request, Response } from "express";
import cors from 'cors';

import geminiRouter from "./gemini/gemini-router";
import GeminiService from "./gemini/gemini-service";

import claudeRouter from "./claude/cluade-router";
import ClaudeService from "./claude/claude-service";

import { activate_test } from "./api/activate_test";

import polygonAddProblemPuppeteer from "./polygon/polygon_full_puppeteer";
import polygonAddProblemApi from "./polygon/polygon_api";

import axios from "axios";
import qs from 'qs';
import bodyParser from "body-parser";

const app = express();
const geminiService = new GeminiService();

// Middleware setup

const allowedOrigins = [
  'https://olympath-ai.vercel.app',
  'http://localhost:3000'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowedOrigins array or if it's not provided (for non-browser requests)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Database connection
// connectDB(); // Uncomment when you need to connect to the database

// Routes
// app.use(geminiRouter);
app.use(claudeRouter);

// Generate Tests API
app.post("/generateTests", async (req: Request, res: Response) => {
  const { number, input, output, testInput, testOutput } = req.body;
  try {
    const file_links = await activate_test(number.toString(), input, output, testInput, testOutput);
    console.log("Tests generated successfully!");
    res.status(201).json({ file_links });
  } catch (err: any) {
    console.error("Error generating tests", err);
    res.status(500).json({ message: "Error generating tests", err });
  }
});

// Create Polygon problem using Puppeteer
app.post("/polygonAddProblemPuppeteer", async (req: Request, res: Response) => {
  const { title, statement, input, output, testInput, testOutput, notes, tests, user, sol, timeLimit, memoryLimit, userLang } = req.body;
  let solution: string = sol || await geminiService.generateSolution(statement, input, output, testInput, testOutput, notes, timeLimit, memoryLimit, userLang);

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
  const { title, statement, input, output, testInput, testOutput, notes, tests, user, sol, timeLimit, memoryLimit, problemLanguage, userLang, apiKey, apiSecret } = req.body;
  let solution: string = sol || await geminiService.generateSolution(statement, input, output, testInput, testOutput, notes, timeLimit, memoryLimit, userLang);

  try {
    await polygonAddProblemApi(title, statement, input, output, testInput, testOutput, notes, tests, user, solution, timeLimit, memoryLimit, problemLanguage, userLang, apiKey, apiSecret);
    res.status(201).json({ message: "Problem created successfully!" });
  } catch (err: any) {
    console.error("Error creating problem with API", err);
    res.status(500).json({ message: "Error creating problem", err });
  }
});

// Root route
app.get("/", async (req: Request, res: Response) => {
  res.status(201).json("It works!");
});

app.post("/compile", async (req, res) => {
  //getting the required data from the request
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;
  //calling the code compilation API
  let data = qs.stringify({
    'code': code,
    'language': language,
    'input': input
  });
  var config = {
    method: 'post',
    url: 'https://api.codex.jaagrav.in',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  try {
    // console.log("sending compile", code);
    console.log("sending compile")
    const output = await axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (response.data.error) return response.data.error;
        return response.data.output;
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log("finished compile", output);
    console.log("finished output");
    res.status(201).json(output);
  } catch (err: any) {
    console.log("There is an error in compiling the code", err);
    res.status(400).json(err);
  }


})

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
