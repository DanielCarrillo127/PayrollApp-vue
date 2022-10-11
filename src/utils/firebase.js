import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

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
const storage = getStorage(app);
const db = getFirestore(app);

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

const uploadFileStorage = async (file, id, date) => {
  const user = auth.currentUser;
  let payrollUrl = "";
  const storageRef = ref(storage, `${user.uid}/${id}`);
  await uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });

  await getDownloadURL(ref(storage, `${user.uid}/${id}`))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
      payrollUrl = url;
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
    });

  try {
    const docRef = await addDoc(collection(db, `${user.uid}`), {
      payrollUrl,
      date: new Date(date),
      dateString: date,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getPayrollsFuntion = async () => {
  const result = [];
  const user = auth.currentUser;
  const querySnapshot = await getDocs(collection(db, `${user.uid}`));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    result.push(data);
  });
  return result;
};

const deletePayrollFuntion = async (id,urlFile) => {
  const user = auth.currentUser;
  try {
    await deleteDoc(doc(db, `${user.uid}`, id));
  } catch (error) {
    console.log(error);
  }
  //delete file from storage 
  const desertRef = ref(storage, `${urlFile}`);

  await deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      console.log("File deleted successfully")
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};

export {
  auth,
  register,
  login,
  updateName,
  updateEmailFuntion,
  updatePasswordFuntion,
  uploadFileStorage,
  getPayrollsFuntion,
  deletePayrollFuntion,
};
