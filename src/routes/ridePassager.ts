import prisma from "../../prisma/prismaInstance";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await prisma.ridePassager.findMany({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await prisma.ridePassager.findMany({
      where: {
        ride_id: String(id),
      },
    });
    const passager = await prisma.user.findMany({
      where: {
        user_id: { in: ride.map((ride) => ride.passager_id) },
      },
    });
    res.status(200).json({ ride, passager });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
