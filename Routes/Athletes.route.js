import {
    getAllAthletes,
    getAlthleteById,
    createAthlete,
    updateAthlete,
    deleteAthlete,
    getAthleteHistory

} from "../Controllers/Athletes.controller.js";
import Router from "express";
const route = Router();

route.get("/",getAllAthletes);
route.get("/:id",getAlthleteById);
route.post("/",createAthlete);
route.put("/:id",updateAthlete);
route.delete("/:id",deleteAthlete);
route.get("/history/:id",getAthleteHistory);

export default route;