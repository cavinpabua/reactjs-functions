const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const admin = require('firebase-admin');
admin.initializeApp();
let REPORT_NAME = "reports"
let db = admin.firestore();

exports.countGender =  functions.firestore.document('/AddressBook/{documentId}')
.onWrite((snap,context) => {
functions.logger.log(snap.after.data());
  if (!snap.before.exists && snap.after.exists) {
      let datas = snap.after.data()
      let gender = datas.gender;
    return db.collection(REPORT_NAME).doc("genders").get()
        .then(docSnap=> {
              if (gender === "Male") {
                return docSnap.ref.update({
                    male: docSnap.data().male  + 1 || 1
                })
              } else if (gender === "Female") {
                return docSnap.ref.update({
                  female: docSnap.data().female + 1 || 1
                })
              } else if (gender === "Other") {
                return docSnap.ref.update({
                  other: docSnap.data().other + 1 || 1
                })
              } else {
                return docSnap.ref.update({
                  unknown: docSnap.data().unknown + 1 || 1
                })
              }

        }

        )
  }
  if (snap.before.exists  && snap.after.exists) {
      let datas_before = snap.before.data()
      let datas_after = snap.after.data()
      let genderBefore = datas_before.gender;
      let genderAfter = datas_after.gender;
    return db.collection(REPORT_NAME).doc("genders").get()
        .then(docSnap=>{
               let docRef = docSnap.ref
                if (genderAfter === genderBefore){
                    return docRef
                }
              if (genderBefore === "Male") {
                docRef.update({
                  'male': docSnap.data().male  - 1 || 0
                })
              } else if (genderBefore === "Female") {
                docRef.update({
                  female: docSnap.data().female - 1 || 0
                })
              } else if (genderBefore === "Other") {
                docRef.update({
                  other: docSnap.data().other - 1 || 0
                })
              } else {
                docRef.update({
                  unknown: docSnap.data().unknown - 1 || 0
                })
              }
                if (genderAfter === "Male") {
                    docRef.update({
                        'male': docSnap.data().male  + 1 || 0
                    })
                } else if (genderAfter === "Female") {
                    docRef.update({
                        female: docSnap.data().female + 1 || 0
                    })
                } else if (genderAfter === "Other") {
                    docRef.update({
                        other: docSnap.data().other + 1 || 0
                    })
                } else {
                    docRef.update({
                        unknown: docSnap.data().unknown + 1 || 0
                    })
                }
                return docRef
            }
        )
  }
  return null

})

exports.decreaseGender =  functions.firestore.document('/AddressBook/{documentId}')
    .onDelete((snap,context) => {
        let datas = snap.data()
        let gender = datas.gender;
        return db.collection(REPORT_NAME).doc("genders").get()
            .then(docSnap=>{
                if (gender === "Male") {
                    return docSnap.ref.update({
                        male: docSnap.data().male  - 1 || 0
                    })
                } else if (gender === "Female") {
                    return docSnap.ref.update({
                        female: docSnap.data().female - 1 || 0
                    })
                } else if (gender === "Other") {
                    return docSnap.ref.update({
                        other: docSnap.data().other - 1 || 0
                    })
                } else {
                    return docSnap.ref.update({
                        unknown: docSnap.data().unknown - 1 || 0
                    })
                }
            })
    })