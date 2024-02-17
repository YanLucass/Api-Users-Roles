import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { User } from "@users/entities/User";

type UpdateUserProfileDTO = {
   userId: string;
   name: string;
   email: string;
   password?: string;
   confirmNewPassword?: string;
   oldPassword?: string;
};

@injectable()
export class UpdateUserProfileUseCase {
   constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

   async execute({
      userId,
      name,
      email,
      password,
      confirmNewPassword,
      oldPassword,
   }: UpdateUserProfileDTO): Promise<User> {
      // Check if user exists
      const user = await this.usersRepository.findById(userId);
      if (!user) {
         throw new AppError("User not found", 404);
      }

      // Check if email belongs to another user
      const userOwnerEmail = await this.usersRepository.findByEmail(email);
      if (user.email !== email && userOwnerEmail) {
         throw new AppError("There is already a user with this email");
      }

      // If the user wants to change the password
      if (oldPassword && password && confirmNewPassword) {
         // Check if the old password provided matches the user's password

         const checkOldPassword = await compare(oldPassword, user.password);
         if (!checkOldPassword) {
            throw new AppError("Old password does not match", 401);
         }

         // Check if the new password and confirmation match
         if (password !== confirmNewPassword) {
            throw new AppError("Password and confirm need to be equal", 422);
         }

         // If all checks pass, update the password
         user.password = await hash(password, 12);
      }

      // Update other fields
      user.name = name;
      user.email = email;

      // Save the updated user
      return this.usersRepository.save(user);
   }
}
