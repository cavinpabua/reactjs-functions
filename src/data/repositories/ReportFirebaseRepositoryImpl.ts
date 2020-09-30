import { Report } from "../../domain/entities/Report";
import { ReportRepository } from "../../domain/repositories/ReportRepository";
const firebase = require("firebase");
require("firebase/firestore");
class ReportDTO {
  male: string= "";
  female: string = ""
  other: string = "";
  unknown: string = "";
}

let db = firebase.firestore();
const STORAGE_NAME = "reports";

export class ReportFirebaseRepositoryImpl implements ReportRepository {

  async GetReport(): Promise<Report[]>{

    let dataRef = db.collection(STORAGE_NAME)
    let itemArray = await dataRef.get().then((querySnapshot: { docs: any[]; }) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    })


    return itemArray.map((item: ReportDTO) => new Report(item.male, item.female, item.other,item.unknown));
  }

}
