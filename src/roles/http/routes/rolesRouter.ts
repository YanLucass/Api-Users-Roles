import { Router } from "express";
//celebrate
import { celebrate, Joi, Segments } from "celebrate";

const roulesRouter = Router();

//importar instancia do controller
import { createRoleController } from "@roles/usesCases/createRole/instancias";
import { listRolesController } from "@roles/usesCases/listRoles/instancias";
import { showRoleController } from "@roles/usesCases/showRole/instancias";
import { updateController } from "@roles/usesCases/updateRole/instancias";
import { deleteRoleController } from "@roles/usesCases/deleteRole/instancias";
//simular bd

// criar roles
roulesRouter.post(
   "/",
   celebrate({
      [Segments.BODY]: Joi.object().keys({
         name: Joi.string().required(),
      }),
   }),
   (req, res) => {
      return createRoleController.handle(req, res);
   },
);

//pegar roles
roulesRouter.get(
   "/",
   celebrate({
      [Segments.QUERY]: Joi.object().keys({
         page: Joi.number(),
         limit: Joi.number(),
      }),
   }),
   (req, res) => {
      return listRolesController.handle(req, res);
   },
);

//pegar role por id

roulesRouter.get(
   "/:id",
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         id: Joi.string().uuid().required(),
      }),
   }),
   (req, res) => {
      return showRoleController.handle(req, res);
   },
);

roulesRouter.put(
   "/:id",
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         id: Joi.string().uuid().required(),
      }),

      [Segments.BODY]: Joi.object().keys({
         name: Joi.string().required(),
      }),
   }),
   (req, res) => {
      return updateController.handle(req, res);
   },
);

roulesRouter.delete(
   "/:id",
   celebrate({
      [Segments.PARAMS]: Joi.object().keys({
         id: Joi.string().uuid().required(),
      }),
   }),
   (req, res) => {
      return deleteRoleController.handle(req, res);
   },
);

export { roulesRouter };
