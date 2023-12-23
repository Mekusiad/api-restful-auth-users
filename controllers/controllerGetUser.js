import { User } from "../models/User.js";

export const controllerGetUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const user = await User.find({ _id: _id });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Bad Request.",
    });
  }
};
