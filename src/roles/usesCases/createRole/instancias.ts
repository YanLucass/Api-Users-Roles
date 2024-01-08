import { RolesRepository } from "@roles/repositories/RolesRepository";
import { CreateRoleController } from "./CreateRoleController";
import { CreateRoleUserCase } from "./CreateRoleUseCase";

const rolesRepository = new RolesRepository();
const createRoleUserCase = new CreateRoleUserCase(rolesRepository); //precisa do repository
export const createRoleController = new CreateRoleController(
   createRoleUserCase,
); //precisa da caso de uso que lida com uma ação do usuario no sistema, no caso a criação de uma role.
