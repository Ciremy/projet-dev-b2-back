const PrismaClient = require("@prisma/client").PrismaClient;
const express = require("express");

const prisma = new PrismaClient();
const app = express();

app.get("/", (req: any, res: any) => {
  res.json({ message: "Hello world!" });
});

app.get("/users", async (req: any, res: any) => {
  const users = await prisma.user.findMany();
  console.log(users);

  res.json(users);
});

console.log("Server running on http://localhost:3000");
const server = app.listen(3000);
