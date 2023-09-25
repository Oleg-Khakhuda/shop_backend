import express from "express";
import logger from "morgan";
import cors from "cors";
import { HttpCode } from "./lib/constants";
import helmet from "helmet";
import flash from "express-flash";
import session from "express-session";
import MongoStore from "connect-mongo";
import { LIMIT_JSON } from "./lib/constants";

import orderRouter from "./routes/api/order";
import cartRouter from "./routes/api/cart";
import productsRouter from "./routes/api/products";
import mainCategoriesRouter from "./routes/api/mainCategory";
import categoriesRouter from "./routes/api/category";
import authRouter from "./routes/api/auth";
// import usersRouter from "./routes/api/users";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: MongoStore.create({
      mongoUrl: process.env.URI_DB,
      collection: "sessions",
    }),
  })
);

app.use(flash());
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: LIMIT_JSON }));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(process.env.UPLOAD_DIR))
app.use("/upload", express.static(process.env.UPLOAD_DIR));

// app.use(express.static(process.env.FOLDER_FOR_PLATES))

app.use("/api/cart", cartRouter);
app.use("/api/checkout", orderRouter);
app.use("/api/maincategories", mainCategoriesRouter);
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
