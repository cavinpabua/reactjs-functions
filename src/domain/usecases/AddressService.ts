import { AddressBook } from "../entities/AddressBook";
import { AddressRepository } from "../repositories/AddressRepository";
import moment from "moment";

export class AddressServiceImpl implements AddressRepository {
  itemRepo: AddressRepository;

  constructor(ir: AddressRepository) {
    this.itemRepo = ir;
  }

  async GetAddress(): Promise<AddressBook[]> {
    return await this.itemRepo.GetAddress();
  }

  getAge(dob:string) {
    return moment().diff(moment(dob), 'years');
  }

  getFullName(item:AddressBook){
    return item.firstName + " " + item.middleName + " " + item.lastName
  }

  AddAddress(item:AddressBook) {
    if (item.firstName.length > 0 && item.lastName.length > 0 && item.middleName.length > 0 && item.dob.length > 0) {
      item.age = this.getAge(item.dob)
      item.fullName = this.getFullName(item)
      return this.itemRepo.AddAddress(item);
    }
  }

  DeleteAddress(id:string) {
    return this.itemRepo.DeleteAddress(id);
  }

  UpdateAddress(item:AddressBook) {
    if (item.firstName.length > 0 && item.lastName.length > 0 && item.middleName.length > 0 && item.dob.length > 0) {
      item.age = this.getAge(item.dob)
      item.fullName = this.getFullName(item)
      return this.itemRepo.UpdateAddress(item);
    }
  }

  async UploadAvatar(imageFile:any) {
      return await this.itemRepo.UploadAvatar(imageFile);
  }

}
