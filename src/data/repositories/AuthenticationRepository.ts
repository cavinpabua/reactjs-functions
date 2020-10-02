import {Authentication} from "../../domain/entities/Authentication";
import {AuthenticationRepository as AuthenticationRepositories} from "../../domain/repositories/AuthenticationRepository";
import {auth, reauth} from "./firebase";

export class AuthenticationRepository implements AuthenticationRepositories {
  async Login(params:Authentication): Promise<any> {
      return await auth.signInWithEmailAndPassword(params.identifier, params.password).then(function (){
          const user = auth.currentUser;
          localStorage.setItem("currentUser", user.email)
          return "success"
      }).catch(function(error: { code: any; message: any; }) {
          return error.message
      })

  }

    reauthenticate = (currentPassword: any) => {
        let user = auth.currentUser;
        let cred = reauth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
  ChangePassword(params: any) {
      return this.reauthenticate(params.old_pass).then(() => {
          let user = auth.currentUser;
          return user.updatePassword(params.new_pass).then(() => {
              return "success"
          }).catch((error: any) => { return error.message });
      }).catch((error: any) => { return "Invalid old password" });
  }
  async Logout() {
      await auth.signOut().then(function() {
          localStorage.removeItem("currentUser")
          return "success"
      }).catch(function(error: any) {
          return error
      });
  }

  async Session(){
      const user =await auth.currentUser;
      if (user) {
          console.log("CALLED HERE")
          return true
      }
      return false

  }

  async Register(params: Authentication): Promise<any> {
    return auth.createUserWithEmailAndPassword(params.identifier, params.password).then((resp: any) =>{
            const user = auth.currentUser;
            console.log(user)
          return "success"
        })
        .catch(function (error: { code: any; message: any; }) {
            return error.message
        });

  }

}
