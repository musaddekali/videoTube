import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import

app.get("/", (req, res) => {
  res.json({
    msg: "hello world"
  });
});

app.get("/mahid", (req, res) => {
  res.send({
    msg: "Hello mahid, How are you?"
  });
});

export { app };
