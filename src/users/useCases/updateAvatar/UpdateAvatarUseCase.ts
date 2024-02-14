// Core modules
import path from "node:path";
import fs from "node:fs";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { User } from "@users/entities/User";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
// Upload configuration
import uploadConfig from "@config/uploadImage";

// DTO needed for updating the avatar
type UpdateAvatarDTO = {
   userId: string;
   avatarFileName: string;
};

@injectable()
export class UpdateAvatarUseCase {
   constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

   async execute({ userId, avatarFileName }: UpdateAvatarDTO): Promise<User> {
      // Check if any error occurred, for example, if the token became invalid
      const user = await this.usersRepository.findById(userId);
      if (!user) {
         throw new AppError("Only authenticated user can change avatar", 401);
      }

      // User has an existing avatar and wants to replace it
      if (user.avatar) {
         // Get the path to the user's current avatar (the directory contains the path up to the "uploads" folder, combined with the user's current avatar filename)
         const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

         // Asynchronous method fs.promises.stat returns an object containing file information; if this object is returned, the file exists, and we can proceed with deletion
         try {
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            console.log(userAvatarFileExists);

            // If the file exists, delete it from the path
            if (userAvatarFileExists) {
               await fs.promises.unlink(userAvatarFilePath);
            }
         } catch (error) {
            // Log an error message if the file is not in this directory
            console.log("The file is not in this directory", error);
         }

         // Set the user's new avatar and save the changes
         user.avatar = avatarFileName;
         return this.usersRepository.save(user);
      }
   }
}
