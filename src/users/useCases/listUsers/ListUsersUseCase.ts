import { inject, injectable } from "tsyringe";
import { IUsersRepository, UsersPaginateProperties } from "@users/repositories/IUsersRepository";

//type to paginate params
type ListUsersPaginateParams = {
   page: number;
   limit: number;
};

@injectable()
export class ListUsersUseCase {
   constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

   async execute({ page, limit }: ListUsersPaginateParams): Promise<UsersPaginateProperties> {
      const take = limit; //limit = take
      //calc skip
      const skip = (page - 1) * take;
      return this.usersRepository.findAll({ page, skip, take });
   }
}
