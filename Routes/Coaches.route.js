import { Router } from "express";
const route = Router();

import { getAllCoaches,getCoachesById,createCoach,deleteCoach } from "../Controllers/Coaches.controller.js";

route.get("/",getAllCoaches);
route.get("/:id",getCoachesById);
route.post("/",createCoach);
route.delete("/:id",deleteCoach);
export default route;