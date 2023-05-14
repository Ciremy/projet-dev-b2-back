import prisma from "../../prisma/prismaInstance";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { conversation_id } = req.query;
    const users = await prisma.message.findMany({
      where: {
        conversation_id: String(conversation_id),
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { conversation_id, user_id, message } = req.body;
    const newMessage = await prisma.message.create({
      data: {
        conversation_id,
        user_id,
        message,
      },
    });
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await prisma.message.delete({
      where: {
        message_id: String(id),
      },
    });
    res.status(200).json(deletedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
