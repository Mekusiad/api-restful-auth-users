import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signIn = express.Router();

signIn.post("/", async (req, res, next) => {
  const { id, email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).send({ message: "Usuário e/ou senha inválida!!!" });
  }

  const correctUser = bcrypt.compareSync(password, user.password);

  if (!correctUser) {
    return res.status(400).send({ message: "Usuário e/ou senha inválida!!!" });
  }

  if (user && correctUser) {
    const token = jwt.sign(
      {
        id: id,
        email: email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "0.5h",
      }
    );
    return res
      .status(200)
      .send({ message: "Usuário autenticado com sucesso!!!", token: token });
  }

  return res.status(401).send({ message: "Falha na autenticação." });
});
