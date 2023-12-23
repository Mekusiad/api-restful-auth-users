import express from "express";

import { loginMiddleware } from "../middlewares/loginMiddleware.js";
import { controllerGetUser } from "../controllers/controllerGetUser.js";

export const getUser = express.Router();

getUser.get("/:id", loginMiddleware, controllerGetUser);
