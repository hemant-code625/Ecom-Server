import { app } from "./app.js";
import mongoose from "mongoose";

mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ status: "success" });
});

app.listen(8080, () => {
  console.log("server is live on port 8080");
});
