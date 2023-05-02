import { User } from "@prisma/client";
import prisma from "../../prisma/prismaInstance";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await prisma.conversation.findMany({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await prisma.conversation.findMany({
      where: {
        conversation_id: String(id),
      },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const { ride_id, users }: { ride_id: string; users?: string[] } = req.body;

  console.log(ride_id, users);

  const uniqueConvMember = new Set(users);
  if (uniqueConvMember.size !== users?.length) {
    res.status(400).send("There are duplicate conversation members");
  }
  try {
    const userConnection = users?.map((user) => ({ user_id: user }));
    const newConv = await prisma.conversation.create({
      data: {
        ride_id,
        users: {
          connect: userConnection,
        },
      },
      include: {
        users: true,
      },
    });
    res.json(newConv);
  } catch (error) {
    res.status(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedConversation = await prisma.conversation.delete({
      where: {
        conversation_id: id,
      },
    });
    res.status(200).json(deletedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { ride_id, users }: { ride_id: string; users?: string[] } = req.body;
    const uniqueConvMember = new Set(users);
    if (uniqueConvMember.size !== users?.length) {
      res.status(400).send("There are duplicate conversation members");
    }
    const userConnection = users?.map((user) => ({ user_id: user }));
    const updatedConversation = await prisma.conversation.update({
      where: {
        conversation_id: id,
      },
      data: {
        ride_id,
        users: {
          connect: userConnection,
        },
      },
      include: {
        users: true,
      },
    });
    res.status(200).json(updatedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
