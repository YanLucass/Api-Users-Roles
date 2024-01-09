import { Router } from "express";

const roulesRouter = Router();

//importar instancia do controller
import { createRoleController } from "@roles/usesCases/createRole/instancias";
import { listRolesController } from "@roles/usesCases/listRoles/instancias";
//simular bd

// criar roles
roulesRouter.post("/", (req, res) => {
   return createRoleController.handle(req, res);
});

//pegar roles

roulesRouter.get("/", (req, res) => {
   return listRolesController.handle(req, res);
});

export { roulesRouter };
