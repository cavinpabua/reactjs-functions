import { AuthenticationRepository } from "../../../data/repositories/AuthenticationRepository";
import { AuthenticationService } from "../../../domain/usecases/AuthenticationService";
import { AUTH_SUCCESS, AUTH_FAILURE } from "../Protected/Protected.types";
export const sessionCheck = async (dispatch) => {
  const todoRepo = new AuthenticationRepository();
  const itemService = new AuthenticationService(todoRepo);
  return await itemService.Session();
};

export const Register = async (payload) => {
  const todoRepo = new AuthenticationRepository();
  const itemService = new AuthenticationService(todoRepo);
  return await itemService.Register(payload);
};

export const Login = (payload) => {
  return async (dispatch) => {
    const todoRepo = new AuthenticationRepository();
    const itemService = new AuthenticationService(todoRepo);

    let status = await itemService.Login(payload);
    if (status === "success") {
      dispatch({ type: AUTH_SUCCESS });
    } else {
      dispatch({ type: AUTH_FAILURE });
    }
    return status;
  };
};
