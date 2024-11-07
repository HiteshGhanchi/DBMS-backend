import express from "express";

import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// all routes import
import userRouter from "./Routes/User.route.js";
import AthleteRouter from "./Routes/Athletes.route.js";
import CoachesRouter from "./Routes/Coaches.route.js"
// All the routes
app.use("/auth",userRouter);
app.use("/api/v1/athletes",AthleteRouter);
app.use("/api/v1/coaches",CoachesRouter);



export default app;
