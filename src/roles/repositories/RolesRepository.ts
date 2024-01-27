import { Role } from "@roles/entities/Role";
import { PostgresDataSource } from "@shared/typeorm";
import { Repository } from "typeorm";
import {
   CreateRoleDTO,
   IRolesRepository,
   PaginateParams,
   RolesPaginatesProperties,
} from "./IRolesRepository";

export class RolesRepository implements IRolesRepository {
   private rolesRepository: Repository<Role>;

   //criar repositorio
   public constructor() {
      this.rolesRepository = PostgresDataSource.getRepository(Role);
   }

   //metodo paracriar role e salvar no bd
   async create({ name }: CreateRoleDTO): Promise<Role> {
      const role = await this.rolesRepository.create({ name }); //está criando o objeto role com o atributo nome
      //no caso so passamos o nome, pq é so oq uma role pede, o created e id é automatico.
      //salvar o objeto role no bd
      return this.rolesRepository.save(role);
   }

   // atualizar uma role, ao contrário do create que cria e salva, aqui já vem uma pronta
   async save(role: Role): Promise<Role> {
      return this.rolesRepository.save(role);
   }

   //deletar Role
   async delete(role: Role): Promise<void> {
      // a promessa não retorna nada porque so estamos apagando
      await this.rolesRepository.remove(role);
   }

   //buscar registro por paginação
   async findAll({ page, skip, take }: PaginateParams): Promise<RolesPaginatesProperties> {
      //consulta para retornar os registros.
      const [roles, count] = await this.rolesRepository
         .createQueryBuilder()
         .skip(skip)
         .take(take)
         .getManyAndCount(); //pega os registros e o total que existe na tabela. retorna isso num array

      const result = {
         per_page: take,
         total: count,
         current_page: page,
         data: roles, //pegamos da desesturturação retornado pelo getManyAndCOutn
      };

      return result;
   }

   //caso o user n informe qual page quer e registro o defualt vai ser GET /roles => page = 1 limit = 15 registro
   //Caso o usuario escolha fica GET /roles?page=5&limit=10  => retorno page=5 e limit=10

   //buscar por nome
   async findByName(nameRole: string): Promise<Role | null> {
      //n precisa de await qnd usar return
      return this.rolesRepository.findOneBy({ name: nameRole });
   }

   //buscar por id
   async findById(id: string): Promise<Role | null> {
      return this.rolesRepository.findOneBy({ id });
   }
}
