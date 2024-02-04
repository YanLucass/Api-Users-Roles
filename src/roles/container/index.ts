import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { CreateRoleController } from "@roles/usesCases/createRole/CreateRoleController";
import { DeleteRoleController } from "@roles/usesCases/deleteRole/DeleteRoleController";
import { ListRolesController } from "@roles/usesCases/listRoles/ListRolesController";
import { ShowRoleController } from "@roles/usesCases/showRole/ShowRoleController";
import { UpdateRoleController } from "@roles/usesCases/updateRole/UpdateRoleController";
import { container } from "tsyringe";

container.registerSingleton<IRolesRepository>("RolesRepository", RolesRepository);

container.registerSingleton("CreateRoleController", CreateRoleController);

container.registerSingleton("DeleteRoleController", DeleteRoleController);

container.registerSingleton("ListRolesController", ListRolesController);

container.registerSingleton("ShowRoleController", ShowRoleController);

container.registerSingleton("UpdateRoleController", UpdateRoleController);
