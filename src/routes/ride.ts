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

//to do fixtime zone
//to do : remove ride where seats_available = 0
router.get("/travel/", async (req, res) => {
  const { start_time, from, to } = req.query;

  try {
    if (!start_time || !from || !to) {
      res.status(400).json({ message: "Missing parameters" });
    } else {
      const startDate = new Date(start_time as string);
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
      const rides = await prisma.ride.findMany({
        where: {
          start_time: {
            lte: endDate.toISOString(),
            gte: startDate.toISOString(),
          },
          from: String(from),
          to: String(to),
        },
      });
      const modifiedRides = rides.map((ride) => {
        if (ride.seats_available > 0) {
          return ride;
        } else {
          return null;
        }
      });
      res.status(200).json(modifiedRides.filter((ride) => ride !== null));
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/travel/:id", async (req, res) => {
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

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.ride.findMany({
      where: {
        ower_id: String(id),
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

router.put("/takeSeat/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { passager_id } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        user_id: String(passager_id),
      },
    });
    const ride = await prisma.ride.findUnique({
      where: {
        ride_id: String(id),
      },
    });
    if (ride && user) {
      let seats_available: number = ride.seats_available;
      if (seats_available >= 0) {
        seats_available = ride.seats_available - 1;
        const updatedRide = await prisma.ride.update({
          where: {
            ride_id: String(id),
          },
          data: {
            seats_available,
          },
        });
        const ridePassager = await prisma.ridePassager.create({
          data: {
            ride_id: String(id),
            passager_id: String(passager_id),
          },
        });
        res.status(200).json(updatedRide);
      } else {
        res.status(400).json({ message: "No seats available" });
      }
    } else {
      res.status(404).json({ message: "Ride not found or User doesn't exist" });
    }
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
