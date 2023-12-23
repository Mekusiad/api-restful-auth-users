import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { User } from "../models/User.js";

dotenv.config();

export const controllerSignIn = async (req, res, next) => {
  try {
    const { password } = req.body;

    const correctPassword = bcrypt.compareSync(password, req.user.password);

    if (!correctPassword) {
      return res
        .status(400)
        .json({ message: "Usuário e/ou senha inválida!!!" });
    }

    await User.updateOne(
      { email: req.user.email },
      { $set: { last_login: new Date() } }
    );

    const { _id, name, created_at, updated_at, last_login, token } = req.user;

    const showUser = { _id, name, created_at, updated_at, last_login, token };

    return res.status(200).json({ showUser });
  } catch (error) {
    return res.status(401).json({ message: "Falha na autenticação." });
  }
};
