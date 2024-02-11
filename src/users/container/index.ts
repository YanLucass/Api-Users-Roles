import { container } from "tsyringe";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { UsersRepository } from "@users/repositories/UsersRepository";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersController";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
//controller
container.registerSingleton("CreateUserController", CreateUserController);
container.registerSingleton("ListUserController", ListUsersController);
container.registerSingleton("CreateLoginController", CreateLoginController);
