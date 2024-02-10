import { User } from "@users/entities/User";
import {
   CreateUserDTO,
   IUsersRepository,
   PaginateParams,
   UsersPaginateProperties,
} from "./IUsersRepository";
import { Repository } from "typeorm";
import { PostgresDataSource } from "@shared/typeorm";

export class UsersRepository implements IUsersRepository {
   private userRepository: Repository<User>;
   //create repository
   constructor() {
      this.userRepository = PostgresDataSource.getRepository(User);
   }

   //method create user
   async create({ name, email, password, isAdmin, role }: CreateUserDTO): Promise<User> {
      //create user instance
      const user = this.userRepository.create({ name, email, password, isAdmin, role });
      //save in bd
      return this.userRepository.save(user);
   }

   //save user
   async save(user: User): Promise<User> {
      return this.userRepository.save(user);
   }

   //find all with paginate params.
   async findAll({ page, skip, take }: PaginateParams): Promise<UsersPaginateProperties> {
      const [users, count] = await this.userRepository
         .createQueryBuilder("user") // alias to entity User.
         .leftJoinAndSelect("user.role", "role") //show users and your role(null or no)
         .skip(skip)
         .take(take)
         .getManyAndCount();

      //return object with the structure of UsersPaginateProperties
      const result = {
         per_page: take,
         total: count,
         current_page: page,
         data: users,
      };

      return result;
   }

   async findById(id: string): Promise<User | null> {
      return this.userRepository.findOneBy({ id });
   }

   async findByName(name: string): Promise<User | null> {
      return this.userRepository.findOneBy({ name });
   }

   async findByEmail(email: string): Promise<User | null> {
      return this.userRepository.findOneBy({ email });
   }
   async delete(user: User): Promise<void> {
      await this.userRepository.remove(user);
   }
}
