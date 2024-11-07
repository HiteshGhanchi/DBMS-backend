import { Router } from "express";
import { getAllDisqualified, disqualifyAthlete } from "../Controllers/Disqualification.controller.js";
import { Auth } from "../Middleware/Auth.js";

const route = Router();

route.get("/",getAllDisqualified);
route.post("/",Auth,disqualifyAthlete);

export default route;