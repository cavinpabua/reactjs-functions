import { Authentication } from "../entities/Authentication";

export interface AuthenticationRepository {
  Register(params:Authentication): any;
  Login(params:Authentication): any;
  ChangePassword(params:any): any;
  Logout():any;
  Session():any;
}
