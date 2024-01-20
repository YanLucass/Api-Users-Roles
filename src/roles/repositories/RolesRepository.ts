import { Role } from "@roles/entities/Role";
import { PostgresDataSource } from "@shared/typeorm";
import { Repository } from "typeorm";
// Qual tipo de informação vamos receber por parametro para criar uma Role?
type CreateRoleDTO = {
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

export class RolesRepository {
   private rolesRepository: Repository<Role>;

   // Para o pattern Singleton
   private static INSTANCE: RolesRepository;

   //criar repositorio
   private constructor() {
      this.rolesRepository = PostgresDataSource.getRepository(Role);
   }

   //metodo para criar primeira instancia e garantir que seja unica
   public static getInstance(): RolesRepository {
      if (!this.INSTANCE) {
         this.INSTANCE = new RolesRepository();
      }
      return this.INSTANCE;
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
