import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import routes from "../routes/routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
console.log(process.env.CORS_ORIGIN);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
//form data
app.use(
  express.json({
    limit: "16kb",
  })
);
//url data
app.use(
  express.urlencoded({
    extended: true, //object inside object
    limit: "16kb",
  })
);
//public assets to store images and pdf files
app.use(express.static("public"));

app.use(cookieParser());
app.use("/", routes);
export { app };
