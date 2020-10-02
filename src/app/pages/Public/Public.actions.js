import {AuthenticationRepository} from "../../../data/repositories/AuthenticationRepository";
import {AuthenticationService} from "../../../domain/usecases/AuthenticationService";

export const sessionCheck = async (dispatch) => {
    const todoRepo = new AuthenticationRepository();
    const itemService = new AuthenticationService(todoRepo);
    return await itemService.Session()
};

export const Register = async (payload) => {
    const todoRepo = new AuthenticationRepository();
    const itemService = new AuthenticationService(todoRepo);
    return await itemService.Register(payload)
};

export const Login = async (payload) => {
    const todoRepo = new AuthenticationRepository();
    const itemService = new AuthenticationService(todoRepo);
    return await itemService.Login(payload)
};