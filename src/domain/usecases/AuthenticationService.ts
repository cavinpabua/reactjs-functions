import { Authentication } from "../entities/Authentication";
import { AuthenticationRepository } from "../repositories/AuthenticationRepository";

export class AuthenticationService implements AuthenticationRepository {
  itemRepo: AuthenticationRepository;

  constructor(ir: AuthenticationRepository) {
    this.itemRepo = ir;
  }

  ChangePassword(params: any): any {
    if (params.old_pass && params.new_pass)
      return this.itemRepo.ChangePassword(params)
  }

  Login(params:Authentication): any {
    if (params.identifier && params.password)
    return this.itemRepo.Login(params);
  }

  async Session():Promise<any> {
    return await this.itemRepo.Session();
  }

  Logout(): any {
    return this.itemRepo.Logout();
  }

  async Register(params: Authentication): Promise<any> {
    if (params.identifier && params.password)
    return await this.itemRepo.Register(params);
  }


}
