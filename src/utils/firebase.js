import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMKYbAkKhgp4aFifI4dczyjyD4yt2cqCE",
  authDomain: "payroll-app-vue.firebaseapp.com",
  projectId: "payroll-app-vue",
  storageBucket: "payroll-app-vue.appspot.com",
  messagingSenderId: "1047486116902",
  appId: "1:1047486116902:web:6a64cfa7e4f783ecd622e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const register = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    });
};

const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    });
};

const updateName = (name) => {
  updateProfile(auth.currentUser, {
    displayName: name,
  })
    .then(() => {
      console.log("success updateProfile", auth.currentUser);
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateEmailFuntion = (email) => {
  updateEmail(auth.currentUser, email)
    .then(() => {
      // Email updated!
      console.log("success Email updated!", auth.currentUser);
    })
    .catch((error) => {
      // An error occurred
      console.log(error);
    });
};

const updatePasswordFuntion = (newPassword) => {
  const user = auth.currentUser;
  updatePassword(user, newPassword)
    .then(() => {})
    .catch((error) => {
      // An error ocurred
      // ...
      console.log(error);
    });
};

export {
  auth,
  register,
  login,
  updateName,
  updateEmailFuntion,
  updatePasswordFuntion,
};
