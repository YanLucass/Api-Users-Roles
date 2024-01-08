import { Router } from "express";

const roulesRouter = Router();

//importar instancia do controller
import { createRoleController } from "@roles/usesCases/createRole/instancias";
//simular bd

// criar roles
roulesRouter.post("/", (req, res) => {
   return createRoleController.handle(req, res);
});

//pegar roles

roulesRouter.get("/", (req, res) => {
   // const roles = rolesRepository.findAll();
   // return res.json({ message: "Roles", roles });
});

export { roulesRouter };
