import express from "express";
import { User } from "../models/User.js";

import { login } from "../middleware/login.js";

export const getUsers = express.Router();

getUsers.get("/:id", login, async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { id } = User;
    const user = await User.find({ id: _id });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      message: "Bad Request.",
    });
  }
});
