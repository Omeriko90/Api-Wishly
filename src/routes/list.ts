import express, { Request, Response } from "express";
import List from "@/models/List";
import { Types } from "mongoose";
import Wish from "@/models/Wish";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { title, user_id, description } = req.body;

  const list = await List.create({
    _id: new Types.ObjectId(),
    title,
    user_id,
    description,
  });

  res.status(201).send(list);
});

router.get("/:id", async (req: Request, res: Response) => {
  const listId = req.params.id;
  const list = await List.findById(new Types.ObjectId(listId));

  res.status(200).send(list);
});
router.get("/:id/wishes", async (req: Request, res: Response) => {
  const listId = req.params.id;
  const list = await Wish.find({ listId: new Types.ObjectId(listId) });

  res.status(200).send(list);
});

router.put("/:id", async (req: Request, res: Response) => {
  const listId = req.params.id;
  const { title, description, date } = req.body;
  const updateList = await List.findByIdAndUpdate(
    listId,
    { title, description, date },
    { new: true }
  );

  res.status(200).send(updateList);
});

export default router;
