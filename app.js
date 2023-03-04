import express from "express";
import logger from "morgan";
import cors from "cors";
import { HttpCode } from "./lib/constants";
import helmet from "helmet";

import productsRouter from "./routes/api/products";
import categoriesRouter from "./routes/api/category";
import authRouter from "./routes/api/auth";
// import usersRouter from "./routes/api/users";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(process.env.UPLOAD_DIR))
app.use("/upload", express.static(process.env.UPLOAD_DIR));

// app.use(express.static(process.env.FOLDER_FOR_PLATES))

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth", authRouter);
// app.use("/api/users", usersRouter);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  const status =
    statusCode === HttpCode.INTERNAL_SERVER_ERROR ? "fail" : "error";
  res.status().json({
    status: status,
    code: statusCode,
    message: err.message,
  });
});

export default app;
