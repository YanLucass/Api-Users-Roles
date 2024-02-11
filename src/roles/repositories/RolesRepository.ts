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

   // Create repository
   public constructor() {
      this.rolesRepository = PostgresDataSource.getRepository(Role);
   }

   // Method to create a role and save it in the database
   async create({ name }: CreateRoleDTO): Promise<Role> {
      const role = await this.rolesRepository.create({ name });
      // Creating the role object with the name attribute
      // Here, only the name is passed because it's the only required attribute for a role.
      // The 'created' and 'id' properties are automatically handled.
      // Save the role object in the database
      return this.rolesRepository.save(role);
   }

   // Update a role; in contrast to create, it receives an existing role and saves it
   async save(role: Role): Promise<Role> {
      return this.rolesRepository.save(role);
   }

   // Delete a role
   async delete(role: Role): Promise<void> {
      // The promise doesn't return anything because we are just deleting
      await this.rolesRepository.remove(role);
   }

   // Search for records with pagination
   async findAll({ page, skip, take }: PaginateParams): Promise<RolesPaginatesProperties> {
      // Query to return the records.
      const [roles, count] = await this.rolesRepository
         .createQueryBuilder()
         .skip(skip)
         .take(take)
         .getManyAndCount(); // Gets the records and the total count in the table. Returns them in an array.

      const result = {
         per_page: take,
         total: count,
         current_page: page,
         data: roles, // Extracted from the destructuring returned by getManyAndCount
      };

      return result;
   }

   // If the user doesn't provide the desired page and limit, the default will be GET /roles => page = 1, limit = 15 records
   // If the user chooses to specify, it becomes GET /roles?page=5&limit=10  => returns page=5 and limit=10

   // Search by name
   async findByName(nameRole: string): Promise<Role | null> {
      // No need for 'await' when using 'return'
      return this.rolesRepository.findOneBy({ name: nameRole });
   }

   // Search by id
   async findById(id: string): Promise<Role | null> {
      return this.rolesRepository.findOneBy({ id });
   }
}
