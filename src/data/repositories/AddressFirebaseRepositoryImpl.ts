import {AddressBook} from "../../domain/entities/AddressBook";
import {AddressRepository} from "../../domain/repositories/AddressRepository";
import {db,storage} from "./firebase";

class AddressBookDTO {
  id: string= "";
  fullName: string = ""
  firstName: string = "";
  lastName: string = "";
  middleName: string = "";
  dob: string = "";
  age: number = 0;
  gender: string = "";
  avatarUrl: string = ""

}

const STORAGE_NAME = "AddressBook";


export class AddressRepositoryImpl implements AddressRepository {


  async GetAddress(): Promise<AddressBook[]>{
    let dataRef = db.collection(STORAGE_NAME)
    let itemArray = await dataRef.get().then((querySnapshot: { docs: any[]; }) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    })
    return itemArray.map((item: AddressBookDTO) => new AddressBook(item.id,item.fullName, item.firstName, item.lastName, item.middleName, item.dob, item.age,item.gender,item.avatarUrl));
  }

  async AddAddress(item:AddressBook) {
      db.collection(STORAGE_NAME).add(item)
      .then(()=>{})
      .catch((err: any)=>{
        alert(err)
      })
  }

  async DeleteAddress(id: string) {
    db.collection(STORAGE_NAME).doc(id).delete()
      .then(()=>{})
      .catch((err: any)=>{
        alert(err)
      })
  }

  async UpdateAddress(item: AddressBook) {
    let addressbookRef = db.collection(STORAGE_NAME).doc(item.id)
    addressbookRef.set(item, {merge: true})
    .then(()=>{})
    .catch((err: any)=>{
      alert(err)
    })
  }

  async UploadAvatar(imageAsFile: any){
    return await storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        .then((data: { ref: { getDownloadURL: () => any; }; }) => {
          return data.ref.getDownloadURL()
        })
  }

}
