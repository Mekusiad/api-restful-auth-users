import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
export const controllerSignUp = async (req, res, next) => {
  const { id, name, email, password, phone } = req.body;
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res
      .status(422)
      .send({ message: "Email já cadastrado, tente outro email." });
  }

  if (!name) {
    return res.status(422).json({ error: "O nome é obrigatório!!!" });
  }
  if (!email) {
    return res.status(422).json({ error: "O e-mail é obrigatório!!!" });
  }
  if (!password) {
    return res.status(422).json({ error: "A senha é obrigatório!!!" });
  }
  if (!phone) {
    return res.status(422).json({ error: "O telefone é obrigatório!!!" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const JwtToken = jwt.sign(
    {
      id: id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "0.5h",
    }
  );

  const hashToken = bcrypt.hashSync(JwtToken, salt);

  const user = {
    _id: uuidv4(),
    created_at: new Date(),
    updated_at: new Date(),
    last_login: new Date(),
    token: JwtToken,
    name: name,
    email: email,
    password: hashPassword,
    phone: phone,
  };

  try {
    await User.create(user);
    const { id, created_at, updated_at, last_login, token } = user;
    const showUser = { id, created_at, updated_at, last_login, token };
    res.status(201).json(showUser);
  } catch (error) {
    res.status(500).json({ error: "error" });
  }
};
