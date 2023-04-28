import express, { Request, Response } from "express";
import cors from "cors";

import user from "./routes/user";
import ride from "./routes/ride";
import ridePassager from "./routes/ridePassager";
import conversation from "./routes/conversation";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use(express.json());
app.use(cors());

app.use("/ridePassager", ridePassager);
app.use("/user", user);
app.use("/ride", ride);
app.use("/conversation", conversation);

export default app;
