import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.js";

dotenv.config();

export const loginMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const isValid = await User.findOne({ token: token });
  if (!isValid) return res.status(401).json({ message: "Não autorizado" });

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Sessão inválida" });
    req.decoded = decoded;
    next();
  });
};
