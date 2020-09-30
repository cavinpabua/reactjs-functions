import { AddressBook } from "../entities/AddressBook";

export interface AddressRepository {
  GetAddress(): Promise<AddressBook[]>;
  AddAddress(AddressBook:any):any;
  DeleteAddress(id:string):any;
  UpdateAddress(AddressBook:any):any;
}
