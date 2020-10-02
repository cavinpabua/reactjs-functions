import {AuthenticationRepository} from "../../../data/repositories/AuthenticationRepository";
import {AuthenticationService} from "../../../domain/usecases/AuthenticationService";

export const sessionCheck =async () => {
    const todoRepo = new AuthenticationRepository();
    const itemService = new AuthenticationService(todoRepo);
    return await itemService.Session()
};

export const Logout = async (payload) => {
    const todoRepo = new AuthenticationRepository();
    const itemService = new AuthenticationService(todoRepo);
    return await itemService.Logout()
};

export const ChangePassword = async (payload) => {
    const todoRepo = new AuthenticationRepository();
    const itemService = new AuthenticationService(todoRepo);
    return await itemService.ChangePassword(payload)
};