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


app.all("/api/v1", (_, res) => {
  res.json({
    msg: "hello api"
  });
});

// Routes import
import userRoutes from "./routes/userRoutes.js";

// Routes declearation
app.use("/api/v1/users", userRoutes);

export { app };
