import { Router } from "express";
const route = Router();
import { Auth } from "../Middleware/Auth.js";
import { getAllCoaches,getCoachesById,createCoach,deleteCoach } from "../Controllers/Coaches.controller.js";

route.get("/",getAllCoaches);
route.get("/:id",getCoachesById);
route.post("/",Auth,createCoach);
route.delete("/:id",Auth,deleteCoach);
export default route;