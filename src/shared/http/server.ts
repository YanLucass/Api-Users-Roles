import "dotenv/config";
import express, { NextFunction, Request, Response, response } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

// importar classe para tramento de erro.
import { AppError } from "@shared/errors/AppError";

const app = express();
app.use(cors());

app.use(express.json());

//define routes only file (index.ts)
app.use(router);

// caso tenha ocorrido algum erro nas rotas vamos interceptar aqui.
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  //caso o erro seja uma instancia de AppError vamos retornar um objeto com status e mesagem do erro;
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  //erros da aplicação ex: erros interno do servidor (500)
  console.log(error);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server stard on port ${process.env.PORT}`);
});
