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
import uploadPhoto from "../Middleware/multerupload.js";
const route = Router();

route.get("/",getAllAthletes);
route.get("/:id",getAlthleteById);
route.post("/",Auth,uploadPhoto.single('photo'),createAthlete);
route.put("/:id",Auth,uploadPhoto.single('photo'),updateAthlete);
route.delete("/:id",Auth,deleteAthlete);
route.get("/history/:id",getAthleteHistory);
route.get("/events/:id",getAllEventsForAthlete);

export default route;