import firebase from "firebase/app";
// import { auth } from "./firebase";
import {  EmailAuthProvider } from "firebase/auth";


export function reauthenticate(password) {
    const user = auth.currentUser;

    const credentials = auth.EmailAuthProvider.credential(
        user.email,
        password
    )
    return user.reauthenticateWithCredential(credentials);

}



// const credential = EmailAuthProvider.
// credentialWithLink(
//     email, window.location.href);
  
//   // Re-authenticate the user with this credential.
//   const auth = getAuth();
//   reauthenticateWithCredential(auth.currentUser, credential)
//     .then((usercred) => {
//       // The user is now successfully re-authenticated and can execute sensitive
//       // operations.
//     })
//     .catch((error) => {
//       // Some error occurred.
//     });
  