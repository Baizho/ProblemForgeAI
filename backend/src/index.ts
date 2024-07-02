import "dotenv/config";
import express from "express";
import connectDB from "./db";
import cors from 'cors';
import geminiRouter from "./gemini/gemini-router";
import activate_test from "./api/activate_test";

const app = express();
app.use(cors());
app.use(express.json());

// connectDB();

async function runIT() {
  const res = await activate_test("5");
  console.log(res);
}

runIT();

app.use(geminiRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});
