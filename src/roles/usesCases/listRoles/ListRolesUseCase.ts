import { IRolesRepository, RolesPaginatesProperties } from "@roles/repositories/IRolesRepository";
import { inject, injectable } from "tsyringe";

//precisamos para retornar o objeto desse tipo depois do findAl

//type que o meotodo listROles precisa
type ListRolesUseCaseParams = {
   page: number;
   limit: number;
};

@injectable()
export class ListRolesUseCase {
   constructor(@inject("RolesRepository") private rolesRepository: IRolesRepository) {}

   async execute({ limit, page }: ListRolesUseCaseParams): Promise<RolesPaginatesProperties> {
      const take = limit; // porque take é a quantidade de registro q eu quero pegar limit = take
      const skip = (page - 1) * take;
      const roles = await this.rolesRepository.findAll({ page, skip, take });
      return roles;
   }
}
