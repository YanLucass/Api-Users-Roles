import { Router } from "express";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
//multer
import multer from "multer";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { UpdateAvatarController } from "@users/useCases/updateAvatar/UpdateAvatarController";

//middleware
import { IsAuthenticated } from "@shared/http/middlewares/IsAuthenticated";

//uploadConfig
import uploadConfig from "@config/uploadImage";

const usersRouter = Router();

//controllers
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);
const updateAvatarController = container.resolve(UpdateAvatarController);

//multer middleware
const upload = multer(uploadConfig);

//create user
usersRouter.post(
   "/",
   IsAuthenticated,
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
   IsAuthenticated,
   celebrate({
      [Segments.QUERY]: {
         page: Joi.number(),
         limit: Joi.number(),
      },
   }),

   (req, res) => {
      return listUsersController.handle(req, res);
   },
),
   usersRouter.patch(
      "/avatar",
      IsAuthenticated,
      upload.single("avatar"), //um arquivo recebido do campo avatar

      (req, res) => {
         return updateAvatarController.handle(req, res);
      },
   );

export { usersRouter };
