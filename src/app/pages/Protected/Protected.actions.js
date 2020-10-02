import { AuthenticationRepository } from "../../../data/repositories/AuthenticationRepository";
import { AuthenticationService } from "../../../domain/usecases/AuthenticationService";
import { LOGOUT_SUCCESS } from "../Protected/Protected.types";
export const sessionCheck = async () => {
  const todoRepo = new AuthenticationRepository();
  const itemService = new AuthenticationService(todoRepo);
  return await itemService.Session();
};

export const Logout = () => {
  return async (dispatch) => {
    const todoRepo = new AuthenticationRepository();
    const itemService = new AuthenticationService(todoRepo);
    dispatch({ type: LOGOUT_SUCCESS });
    return await itemService.Logout();
  };
};

export const ChangePassword = async (payload) => {
  const todoRepo = new AuthenticationRepository();
  const itemService = new AuthenticationService(todoRepo);
  return await itemService.ChangePassword(payload);
};
