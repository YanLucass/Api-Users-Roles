import { RolesRepository } from "@roles/repositories/RolesRepository";
import { UpdateRoleUseCase } from "./UpdateRoleUseCase";
import { UpdateRoleController } from "./UpdateRoleController";

const rolesRepository = RolesRepository.getInstance();
const updateRoleUseCase = new UpdateRoleUseCase(rolesRepository);
export const updateController = new UpdateRoleController(updateRoleUseCase);
