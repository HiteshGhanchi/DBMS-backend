import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// all routes import
import userRouter from "./Routes/User.route.js";
import AthleteRouter from "./Routes/Athletes.route.js";
import CoachesRouter from "./Routes/Coaches.route.js";
import TournamentRouter from "./Routes/Tournaments.route.js";
import EventsRouter from "./Routes/Events.route.js";
import DisqualificationRouter from "./Routes/Disqualification.route.js";
import CountryRouter from "./Routes/Country.route.js";
import SportRouter from "./Routes/SportRouter.js";

// All the routes
app.use("/api/v1/auth",userRouter);
app.use("/api/v1/athletes",AthleteRouter);
app.use("/api/v1/coaches",CoachesRouter);
app.use("/api/v1/tournaments",TournamentRouter); 
app.use("/api/v1/events",EventsRouter);
app.use("/api/v1/disqualifications",DisqualificationRouter);
app.use("/api/v1/countries",CountryRouter);
app.use("/api/v1/sports",SportRouter);

export default app;
