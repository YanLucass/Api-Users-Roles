import { RefreshToken } from "@users/entities/RefreshToken";
import { CreateRefreshTokenDTO, IRefreshTokenRepository } from "./IRefreshTokenRepository";
import { Repository } from "typeorm";
import { PostgresDataSource } from "@shared/typeorm";
import { AppError } from "@shared/errors/AppError";

export class RefreshTokenRepository implements IRefreshTokenRepository {
   private refreshTokenRepository: Repository<RefreshToken>;
   constructor() {
      this.refreshTokenRepository = PostgresDataSource.getRepository(RefreshToken);
   }

   //create refresh token
   async create({ user_id, token, expires, valid }: CreateRefreshTokenDTO): Promise<RefreshToken> {
      const refreshToken = await this.refreshTokenRepository.create({
         user_id,
         token,
         expires,
         valid,
      });

      console.log(refreshToken);
      return this.refreshTokenRepository.save(refreshToken);
   }

   findByToken(token: string): Promise<RefreshToken> {
      return this.refreshTokenRepository.findOneBy({ token });
   }
   async invalidate(refresh_token: RefreshToken): Promise<void> {
      //check if refresh token exists (just to make sure)
      const refreshToken = await this.findByToken(refresh_token.token);
      if (!refreshToken) throw new AppError("Token not found", 404);
      //invalidate refresh token
      refreshToken.valid = false;
      await this.refreshTokenRepository.save(refreshToken);
   }
}
