import { RolesRepository } from "@roles/repositories/RolesRepository";
import { DeleteRoleUseCase } from "./DeleteRoleUseCase";
import { DeleteRoleController } from "./DeleteRoleController";

const rolesRepository = RolesRepository.getInstance();
const deleteRoleUseCase = new DeleteRoleUseCase(rolesRepository);
export const deleteRoleController = new DeleteRoleController(deleteRoleUseCase);
