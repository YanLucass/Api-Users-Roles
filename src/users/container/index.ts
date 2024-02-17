import { container } from "tsyringe";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { UsersRepository } from "@users/repositories/UsersRepository";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { UpdateAvatarController } from "@users/useCases/updateAvatar/UpdateAvatarController";
import { ShowUserProfileController } from "@users/useCases/showProfile/ShowUserProfileController";
import { UpdateUserProfileController } from "@users/useCases/updateUserProfile/UpdateUserProfileController";
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
//controllers
container.registerSingleton("CreateUserController", CreateUserController);
container.registerSingleton("ListUserController", ListUsersController);
container.registerSingleton("CreateLoginController", CreateLoginController);
container.registerSingleton("UpdateAvatarController", UpdateAvatarController);
container.registerSingleton("ShowUserProfileController", ShowUserProfileController);
container.registerSingleton("UpdateUserProfileController", UpdateUserProfileController);
