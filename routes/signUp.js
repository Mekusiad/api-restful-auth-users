import express from "express";
import { controllerSignUp } from "../controllers/controllerSignUp.js";

export const signUp = express.Router();

// Cadastrar um usuário
signUp.post("/", controllerSignUp);
