import prisma from "../../prisma/prismaInstance";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const monsters = await prisma.user.findMany({});

    res.status(200).json(monsters);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        user_id: String(id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password, driver_license, age, sex } =
      req.body;
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password,
        driver_license,
        age,
        sex,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
