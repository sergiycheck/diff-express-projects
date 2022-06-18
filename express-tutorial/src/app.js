import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import debug from "debug";
import { default as authorsRoutes } from "./routes/authors.js";
import { default as postsRoutes } from "./routes/posts.js";
import { defaultRoute, authorsRoute, postsRoute } from "./apiRoutes.js";

const log = debug("log");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.get(defaultRoute, (req, res, next) => {
  res.json({
    message: "working api",
  });
});

app.use(authorsRoute, authorsRoutes);
app.use(postsRoute, postsRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  log(error);

  if (res.headersSend) {
    return next(error);
  }

  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
