import { AppError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import { IRefreshTokenRepository } from "@users/repositories/IRefreshTokenRepository";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { createRefreshToken } from "src/helpers/create-refresh-token";
import { createToken } from "src/helpers/create-user-token";
import { inject, injectable } from "tsyringe";

type CreateAccessAndRefreshTokenDTO = {
   user_id: string;
   refresh_token: string;
};

// Response
type IResponse = {
   user: User;
   accessToken: string;
   refreshToken: string;
};
@injectable()
export class CreateAccessAndRefreshTokenUseCase {
   constructor(
      @inject("UsersRepository") private usersRepository: IUsersRepository,
      @inject("RefreshTokenRepository") private refreshTokenRepository: IRefreshTokenRepository,
   ) {}

   public async execute({
      user_id,
      refresh_token,
   }: CreateAccessAndRefreshTokenDTO): Promise<IResponse> {
      // Check if user exists (probably yes)
      const user = await this.usersRepository.findById(user_id);
      if (!user) {
         throw new AppError("User not found", 404);
      }

      // Get refresh token
      const refreshTokenExists = await this.refreshTokenRepository.findByToken(refresh_token);
      console.log(refreshTokenExists);
      if (!refreshTokenExists) {
         throw new AppError("Refresh token is required", 401);
      }

      // Check if refresh token is valid or has time remaining
      const dateNow = new Date().getTime();
      console.log(dateNow);

      if (!refreshTokenExists.valid || refreshTokenExists.expires.getTime() < dateNow) {
         throw new AppError("Refresh token is invalid/expired", 401);
      }

      // Invalidate the current refresh token to create a new one
      await this.refreshTokenRepository.invalidate(refreshTokenExists);

      //get new access / refresh token
      const accessToken = createToken(user);
      const { refreshToken } = createRefreshToken(user);

      return {
         user,
         accessToken,
         refreshToken,
      };
   }
}
