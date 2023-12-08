import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Não autorizado" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).send({ message: "Sessão inválida" });
  }
};
