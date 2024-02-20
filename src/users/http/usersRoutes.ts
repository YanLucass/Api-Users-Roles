import { Router } from "express";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
//multer
import multer from "multer";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { UpdateAvatarController } from "@users/useCases/updateAvatar/UpdateAvatarController";
import { ShowUserProfileController } from "@users/useCases/showProfile/ShowUserProfileController";
import { UpdateUserProfileController } from "@users/useCases/updateUserProfile/UpdateUserProfileController";
import { CreateAccessAndRefreshTokenController } from "@users/useCases/createAccessAndRefreshToken/CreateAccessAndRefreshTokenController";

//middleware
import { IsAuthenticated } from "@shared/http/middlewares/IsAuthenticated";

//uploadConfig
import uploadConfig from "@config/uploadImage";
import { addUserInfoToRequest } from "./middlewares/addUserInfoToRequest";

const usersRouter = Router();

//controllers
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);
const updateAvatarController = container.resolve(UpdateAvatarController);
const showUserProfileController = container.resolve(ShowUserProfileController);
const updateUserProfileController = container.resolve(UpdateUserProfileController);
const createAccessAndRefreshTokenController = container.resolve(
   CreateAccessAndRefreshTokenController,
);

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
),
   //create access token and refresh_token
   usersRouter.post(
      "/refresh_token",
      addUserInfoToRequest,
      celebrate({
         [Segments.BODY]: {
            refresh_token: Joi.string().required(),
         },
      }),
      (req, res) => {
         return createAccessAndRefreshTokenController.handle(req, res);
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
   //MUDAR
   usersRouter.get("/profile", IsAuthenticated, (req, res) => {
      return showUserProfileController.handle(req, res);
   }),
   usersRouter.patch(
      "/avatar",
      IsAuthenticated,
      upload.single("avatar"), //um arquivo recebido do campo avatar

      (req, res) => {
         return updateAvatarController.handle(req, res);
      },
   ),
   usersRouter.put(
      "/updateProfile",
      IsAuthenticated, // Middleware to ensure user is authenticated
      celebrate({
         [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            oldPassword: Joi.string(), // Old password (if changing password)
            password: Joi.string().optional(), // New password is optional
            confirmNewPassword: Joi.string()
               // If password is provided, make confirmNewPassword required
               .valid(Joi.ref("password")) // Reference to validate against the password field
               .when("password", {
                  is: Joi.exist(), // If password field exists
                  then: Joi.required(), // ConfirmNewPassword is required now
               }),
         },
      }),
      (req, res) => {
         return updateUserProfileController.handle(req, res);
      },
   );

export { usersRouter };
