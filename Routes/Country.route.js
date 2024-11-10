import { Router } from "express";
import {Auth} from "../Middleware/Auth.js";
import {getAllCountries,getCountryById,createCountry,deleteCountry} from "../Controllers/Country.controller.js";

const route = Router();

route.get("/",getAllCountries);
route.get("/:id",getCountryById);
route.post("/",Auth,createCountry);
route.delete("/:id",Auth,deleteCountry);

export default route;