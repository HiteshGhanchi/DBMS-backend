import {Auth} from "../Middleware/Auth.js";
import {createEvent,eventInformation,deleteEvent,updateEvent} from "../Controllers/Events.controller.js";
import { Router } from "express";

const route = Router();

route.get("/:id",eventInformation);
route.post("/",Auth,createEvent);
route.put("/:id",Auth,updateEvent);
route.delete("/:id",Auth,deleteEvent);

export default route;
