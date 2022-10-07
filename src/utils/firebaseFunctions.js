import firebase from "firebase/app";
import { auth } from "./firebase";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export function reauthenticate(password) {

  const user = auth.currentUser;
  const credentials = EmailAuthProvider.credential(user.email, password);

  return reauthenticateWithCredential(user, credentials);

}


