import { Router } from "express";
const route = Router();
import { Auth } from "../Middleware/Auth.js";

import { getAllTournaments,
        getTournamentById,
        createTournament,
        updateTournament,
        deleteTournament,
        getAllEventsfromTournament,
        getStandingsForTournament
    } from "../Controllers/Tournaments.controller.js";

route.get("/",getAllTournaments);
route.get("/:id",getTournamentById);
route.post("/",Auth,createTournament);
route.put("/:id",Auth,updateTournament);
route.delete("/:id",Auth,deleteTournament);
route.get("/allevents/:id",getAllEventsfromTournament);
route.get("/standings/:id",getStandingsForTournament);

export default route;