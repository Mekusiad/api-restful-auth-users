import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { signUp } from "./routes/signUp.js";
import { signIn } from "./routes/signIn.js";
import { getUser } from "./routes/getUser.js";

export const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header(
    "Acess-Control-Allow-Header",
    "Origin",
    "Authorization",
    "Content-Type",
    "X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }

  next();
});

app.use("/signUp", signUp);
app.use("/signIn", signIn);
app.use("/getUser", getUser);

// Quando não encontra uma rota, entra nessa condição.
app.use((req, res, next) => {
  const erro = new Error("Route not found");
  erro.status = 404;

  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  return res.send({
    erro: {
      message: error.message,
    },
  });
});
