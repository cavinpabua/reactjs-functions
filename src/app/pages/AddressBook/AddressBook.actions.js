import {
  LIST_LOAD_REQUEST,
  LIST_LOAD_SUCCESS,
  LIST_LOAD_FAILURE,
} from "./AddressBook.types";
import { AddressServiceImpl } from "../../../domain/usecases/AddressService";
import { AddressRepositoryImpl } from "../../../data/repositories/AddressFirebaseRepositoryImpl";

export const refreshList = async (dispatch) => {
  dispatch({ type: LIST_LOAD_REQUEST });

  try {
    const todoRepo = new AddressRepositoryImpl();
    const itemService = new AddressServiceImpl(todoRepo);
    const items = await itemService.GetAddress();
    dispatch({ type: LIST_LOAD_SUCCESS, payload: items });
  } catch (error) {
    dispatch({ type: LIST_LOAD_FAILURE, error });
  }
};

export const addAddress = async (payload) => {
  const todoRepo = new AddressRepositoryImpl();
  const itemService = new AddressServiceImpl(todoRepo);
  await itemService.AddAddress(payload);
  return { type: LIST_LOAD_SUCCESS, payload };
};

export const deleteAddress = async (id) => {
  try {
    const todoRepo = new AddressRepositoryImpl();
    const todoService = new AddressServiceImpl(todoRepo);
    await todoService.DeleteAddress(id);
  } catch (error) {
    alert(error);
  }
};

export const UpdateAddress = async (todo) => {
  try {
    const todoRepo = new AddressRepositoryImpl();
    const todoService = new AddressServiceImpl(todoRepo);
    await todoService.UpdateAddress(todo);
  } catch (error) {
    alert(error);
  }
};

export const UploadAvatar = async (payload) => {
  try {
    const todoRepo = new AddressRepositoryImpl();
    const todoService = new AddressServiceImpl(todoRepo);
    let response = "";
    await todoService.UploadAvatar(payload.file).then((resp) => {
      response = resp;
    });
    return { type: LIST_LOAD_SUCCESS, url: response };
  } catch (error) {
    console.log(error);
  }
};
