import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { AppError } from "@shared/errors/AppError";
import { User } from "@users/entities/User";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
//helper
import { createToken } from "src/helpers/create-user-token";
import { IRefreshTokenRepository } from "@users/repositories/IRefreshTokenRepository";
import { createRefreshToken } from "src/helpers/create-refresh-token";

type CreateLoginDTO = {
   email: string;
   password: string;
};

//type from controller response
type IResponse = {
   user: User;
   accessToken: string;
   refreshToken: string;
};

@injectable()
export class CreateLoginUseCase {
   constructor(
      @inject("UsersRepository") private usersRepository: IUsersRepository,
      @inject("RefreshTokenRepository") private refreshTokenRepository: IRefreshTokenRepository,
   ) {}

   async execute({ email, password }: CreateLoginDTO): Promise<IResponse> {
      //check if email exists
      const user = await this.usersRepository.findByEmail(email);
      if (!user) {
         throw new AppError("Incorrect email/password combination", 401); // confuse message for malicius users.
      }

      //check if password match with user password
      const confirmPassword = await compare(password, user.password);
      if (!confirmPassword) {
         throw new AppError("Incorrect email/password combination", 401);
      }

      //create acceess token
      const accessToken = createToken(user);

      //create refresh token
      const { refreshToken, expires } = createRefreshToken(user);

      await this.refreshTokenRepository.create({
         token: refreshToken,
         expires,
         user_id: user.id,
         valid: true,
      });

      return {
         user,
         accessToken,
         refreshToken,
      };
   }
}
