import prisma from "../../prisma/prismaInstance";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await prisma.ride.findMany({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.ride.findUnique({
      where: {
        ride_id: String(id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { from, to, distance, start_time, price, ower_id, seats } = req.body;
    const ride = await prisma.ride.create({
      data: {
        from,
        to,
        distance,
        start_time,
        price,
        ower_id,
        seats,
        seats_available: seats,
      },
    });
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      from,
      to,
      distance,
      start_time,
      price,
      ower_id,
      seats,
      seats_available,
    } = req.body;
    const ride = await prisma.ride.update({
      where: {
        ride_id: String(id),
      },
      data: {
        from,
        to,
        distance,
        start_time,
        price,
        ower_id,
        seats,
        seats_available,
      },
    });
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await prisma.ride.delete({
      where: {
        ride_id: String(id),
      },
    });
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;