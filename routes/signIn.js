import express from "express";

import { userEmailMiddleware } from "../middlewares/userEmailMiddleware.js";
import { controllerSignIn } from "../controllers/controllerSignIn.js";

export const signIn = express.Router();

signIn.post("/", userEmailMiddleware, controllerSignIn);
