import {
    getAllAthletes,
    getAlthleteById,
    createAthlete,
    updateAthlete,
    deleteAthlete,
    getAthleteHistory,
    getAllEventsForAthlete

} from "../Controllers/Athletes.controller.js";
import Router from "express";
import {Auth} from "../Middleware/Auth.js";
const route = Router();

route.get("/",getAllAthletes);
route.get("/:id",getAlthleteById);
route.post("/",Auth,createAthlete);
route.put("/:id",Auth,updateAthlete);
route.delete("/:id",Auth,deleteAthlete);
route.get("/history/:id",Auth,getAthleteHistory);
route.get("/events/:id",getAllEventsForAthlete);

export default route;