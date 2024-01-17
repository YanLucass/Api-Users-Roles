import { RolesRepository } from "@roles/repositories/RolesRepository";

//precisamos para retornar o objeto desse tipo depois do findAl
import { RolesPaginatesProperties } from "@roles/repositories/RolesRepository";

//type que o meotodo listROles precisa
type ListRolesUseCaseParams = {
   page: number;
   limit: number;
};

export class ListRolesUseCase {
   constructor(private rolesRepository: RolesRepository) {}

   async execute({
      limit,
      page,
   }: ListRolesUseCaseParams): Promise<RolesPaginatesProperties> {
      const take = limit; // porque take é a quantidade de registro q eu quero pegar limit = take
      const skip = (page - 1) * take;
      const roles = await this.rolesRepository.findAll({ page, skip, take });
      return roles;
   }
}
