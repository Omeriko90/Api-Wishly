import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import List from "@/models/List";
import list from "@/routes/list";
import user from "@/routes/user";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017/your-app";

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to the database");
  } catch (error) {
    console.error(error);
  }
})();

app.use("/list", list);
app.use("/user", user);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});