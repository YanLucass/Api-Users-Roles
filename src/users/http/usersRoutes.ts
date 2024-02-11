import { Router } from "express";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";

const usersRouter = Router();

//controllers
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);

//create user
usersRouter.post(
   "/",
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().email().required(),
         password: Joi.string().required(),
         isAdmin: Joi.boolean().required(),
         roleId: Joi.string().uuid().required(),
      },
   }),
   (req, res) => {
      return createUserController.handle(req, res);
   },
);

//list users
usersRouter.get(
   "/",
   celebrate({
      [Segments.QUERY]: {
         page: Joi.number(),
         limit: Joi.number(),
      },
   }),
   (req, res) => {
      return listUsersController.handle(req, res);
   },
);

export { usersRouter };
