import { inject, injectable } from "tsyringe";
import { User } from "@users/entities/User";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

type ShowUserProfileParams = {
   userId: string;
};
@injectable()
export class ShowUserProfileUseCase {
   constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

   //create user
   async execute({ userId }: ShowUserProfileParams): Promise<User> {
      const user = await this.usersRepository.findById(userId);
      if (!user) {
         throw new AppError("User not found", 404);
      }
      return user;
   }
}
