import { User } from "../models/User.js";

export const userEmailMiddleware = async (req, res, next) => {
  const { email } = req.body;

  const userExist = await User.findOne({ email: email });

  if (!userExist)
    return res.send(422).json({ message: "Usuário e/ou senha inválidos" });

  req.user = userExist;
  next();
};
