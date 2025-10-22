import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import blogRouter from './routes/blog.route.js'
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/user", userRouter);

app.use("/Blog", blogRouter);

export default app;
