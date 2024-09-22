import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import productsRouter from "./routes/Products.js";
import cartRouter from "./routes/Cart.js";
import userRouter from "./routes/User.js";
import authRouter from "./routes/Auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // to parse the data from the url encoded form and extended true is to parse nested objects
app.use(cookieParser()); // to perform crud operations on the browser cookies from server

// Routes imports
app.use("/products", productsRouter);
app.use("/carts", cartRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

export { app };
