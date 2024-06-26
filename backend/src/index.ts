import "dotenv/config";
import express from "express";
import connectDB from "./db";
import cors from 'cors';
import {gpt} from './openai/openai';
import authRouter from "./auth/auth-router";
import coursesRouter from "./courses/course-router";
import adminRouter from "./admin/admin-router";
import userRouter from "./auth/user-router";
import fileUpload from "express-fileupload";

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use("/files", express.static("./public"));

app.post('/upload', function(req, res) {
  const req2 = (req as any);
  req2.files.file.mv('./public/' + req2.files.file.name, function(err: any) {
    console.log("Error loading file" + err);
  });
  res.status(200).json({ url: req2.files.file.name });
});

app.post("/gpt", gpt);
app.use(adminRouter);
app.use(userRouter);
app.use("/", authRouter);
app.use("/courses", coursesRouter);
app.post

connectDB();


app.listen(process.env.PORT, () => {
  console.log("server running at http://localhost:3000");
});
