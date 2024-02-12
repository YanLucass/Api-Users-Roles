import { Router } from "express";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { IsAuthenticated } from "@shared/http/middlewares/IsAuthenticated";

const usersRouter = Router();

//controllers
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);

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

//login
usersRouter.post(
   "/login",
   celebrate({
      [Segments.BODY]: {
         email: Joi.string().email().required(),
         password: Joi.string().required(),
      },
   }),

   (req, res) => {
      return createLoginController.handle(req, res);
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

   IsAuthenticated,
   (req, res) => {
      return listUsersController.handle(req, res);
   },
);

export { usersRouter };
