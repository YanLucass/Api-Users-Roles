import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";
import { router } from "./routes";

//swagger
import swaggerUi from "swagger-ui-express";

// importar classe para tramento de erro.
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../swagger.json";
const app = express();
app.use(cors());

app.use(express.json());

// Rota para documentação da API
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//define routes only file (index.ts)
app.use(router);
app.use(errors());

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

// exportar instancia do express.
export { app };
