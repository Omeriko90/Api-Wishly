import express, { Request, Response } from "express";
import { Types } from "mongoose";
import User from "@/models/User";
import List from "@/models/List";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send("Bad request. User ID is required");
  }

  const list = await User.findById(new Types.ObjectId(userId as string));

  res.status(201).send(list);
});

router.get("/:userId/lists", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const lists = await List.find({ user_id: new Types.ObjectId(userId) });

  res.status(200).send(lists);
});

export default router;
