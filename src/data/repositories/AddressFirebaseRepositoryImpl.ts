import { AddressBook } from "../../domain/entities/AddressBook";
import { AddressRepository } from "../../domain/repositories/AddressRepository";
const firebase = require("firebase");
require("firebase/firestore");
class AddressBookDTO {
  id: string= "";
  fullName: string = ""
  firstName: string = "";
  lastName: string = "";
  middleName: string = "";
  dob: string = "";
  age: number = 0;
  gender: string = "";

}
const config = {
  apiKey: "AIzaSyCAJSx8GBpOBTmEg52aokmYDNuEg3i216k",
  authDomain: "reactjs-todo-3cf00.firebaseapp.com",
  databaseURL: "https://reactjs-todo-3cf00.firebaseio.com",
  projectId: "reactjs-todo-3cf00",
  storageBucket: "reactjs-todo-3cf00.appspot.com",
  messagingSenderId: "496710522937",
  appId: "1:496710522937:web:ecdc3f75bfb69ca8ca15e8",
  measurementId: "G-KD0TJWQVSZ"
}
firebase.initializeApp(config);
let db = firebase.firestore();
const STORAGE_NAME = "AddressBook";


export class AddressRepositoryImpl implements AddressRepository {

  async GetAddress(): Promise<AddressBook[]>{
    let dataRef = db.collection(STORAGE_NAME)
    let itemArray = await dataRef.get().then((querySnapshot: { docs: any[]; }) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    })
    return itemArray.map((item: AddressBookDTO) => new AddressBook(item.id,item.fullName, item.firstName, item.lastName, item.middleName, item.dob, item.age,item.gender));
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

}
