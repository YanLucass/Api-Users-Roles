import { Router } from "express";
//celebrate
import { celebrate, Joi, Segments } from "celebrate";
import { container } from "tsyringe";
import { CreateRoleController } from "@roles/usesCases/createRole/CreateRoleController";
import { ListRolesController } from "@roles/usesCases/listRoles/ListRolesController";
import { ShowRoleController } from "@roles/usesCases/showRole/ShowRoleController";
import { UpdateRoleController } from "@roles/usesCases/updateRole/UpdateRoleController";
import { DeleteRoleController } from "@roles/usesCases/deleteRole/DeleteRoleController";

const roulesRouter = Router();

const createRoleController = container.resolve(CreateRoleController);
const listRolesController = container.resolve(ListRolesController);
const showRoleController = container.resolve(ShowRoleController);
const updateRoleController = container.resolve(UpdateRoleController);
const deleteRoleController = container.resolve(DeleteRoleController);

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
      return updateRoleController.handle(req, res);
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
