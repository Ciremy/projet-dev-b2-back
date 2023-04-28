import prisma from "../../prisma/prismaInstance";
import { Router } from "express";

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findMany({
      where: {
        user_id: String(id),
      },
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const { user_id, ride_id, comment, note } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: {
        user_id,
        ride_id,
        comment,
        note,
      },
    });
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { comment, note } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: {
        comment_id: id,
      },
      data: {
        comment,
        note,
      },
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        comment_id: id,
      },
    });
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});
