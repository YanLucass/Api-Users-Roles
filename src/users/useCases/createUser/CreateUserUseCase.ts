import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { User } from "@users/entities/User";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@users/repositories/IUsersRepository";

type ServiceCreateUserDTO = {
   name: string;
   email: string;
   password: string;
   isAdmin: boolean;
   roleId: string;
};
@injectable()
export class CreateUserUseCase {
   constructor(
      @inject("UsersRepository") private usersRepository: IUsersRepository,
      @inject("RolesRepository") private rolesRepository: IRolesRepository,
   ) {}

   //create user
   async execute({ name, email, password, isAdmin, roleId }: ServiceCreateUserDTO): Promise<User> {
      //check if email already exists
      const emailAlreadyExists = await this.usersRepository.findByEmail(email);
      if (emailAlreadyExists) {
         throw new AppError("Email address already used", 422);
      }
      //get instance role to add to a user
      const role = await this.rolesRepository.findById(roleId);

      if (!role) {
         throw new AppError("Role not found", 404);
      }

      //create password hashed
      const hashedPassword = await hash(password, 12);

      //create user object
      const user = await this.usersRepository.create({
         name,
         email,
         password: hashedPassword,
         isAdmin,
         role,
      });

      return user;
   }
}
