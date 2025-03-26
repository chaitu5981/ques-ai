import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db.js";
import authRouter from "./routes/authRouter.js";
import projectRouter from "./routes/projectRouter.js";
import podcastRouter from "./routes/podcastRouter.js";
const app = express();
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "https://ques-ai-orcin.vercel.app/",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;
connectDB();
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/podcasts", podcastRouter);
app.listen(port, () => {
  console.log("Server started on port ", port);
});
