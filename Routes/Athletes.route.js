import {
    getAllAthletes,
    getAlthleteById,
    createAthlete,
    updateAthlete,
    deleteAthlete,

} from "../Controllers/Athletes.controller.js";
import Router from "express";
const route = Router();

route.get("/",getAllAthletes);
route.get("/:id",getAlthleteById);
route.post("/",createAthlete);
route.put("/:id",updateAthlete);
route.delete("/:id",deleteAthlete);


export default route;