import { Role } from "@roles/entities/Role";

// Qual tipo de informação vamos receber por parametro para criar uma Role?
export type CreateRoleDTO = {
   name: string;
};

//tipos para paganiação
export type PaginateParams = {
   page: number;
   skip: number;
   take: number;
};

//forma que os dados paginados serão retornados.

export type RolesPaginatesProperties = {
   per_page: number; // numero de registro por paginas(tamanho da pagina, qnts foram pegos)
   total: number; //registros totais sem paginação
   current_page: number; //numeor d apagina atual
   data: Role[]; //dados em si retornartados.
};

//Vamos passar tudo que é necessário para uma RoleRepository.
export interface IRolesRepository {
   create({ name }: CreateRoleDTO): Promise<Role>;
   save(role: Role): Promise<Role>;
   findAll({ page, skip, take }: PaginateParams): Promise<RolesPaginatesProperties>;
   findById(id: string): Promise<Role | null>;
   findByName(name: string): Promise<Role | null>;
   delete(role: Role): Promise<void>;
}
