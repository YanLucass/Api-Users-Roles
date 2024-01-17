import { Router } from "express";

const roulesRouter = Router();

//importar instancia do controller
import { createRoleController } from "@roles/usesCases/createRole/instancias";
import { listRolesController } from "@roles/usesCases/listRoles/instancias";
import { showRoleController } from "@roles/usesCases/showRole/instancias";
//simular bd

// criar roles
roulesRouter.post("/", (req, res) => {
   return createRoleController.handle(req, res);
});

//pegar roles
roulesRouter.get("/", (req, res) => {
   return listRolesController.handle(req, res);
});

//pegar role por id

roulesRouter.get("/:id", (req, res) => {
   return showRoleController.handle(req, res);
});

export { roulesRouter };
