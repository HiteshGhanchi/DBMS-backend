import { Router } from "express";
import { userRegister, userLogin } from "../Controllers/User.controller.js";

const route = Router();

route.post("/register",userRegister);
route.post("/login",userLogin);

export default route;