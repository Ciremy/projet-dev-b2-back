import express, { Request, Response } from "express";
import cors from "cors";

import user from "./routes/user";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use(express.json());
app.use(cors());

app.use("/user", user);

export default app;
