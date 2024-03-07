// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL2ejnUMmc5q01e_WkBIdIFWznR3yH6aQ",
  authDomain: "linkedin-clone-3f78c.firebaseapp.com",
  projectId: "linkedin-clone-3f78c",
  storageBucket: "linkedin-clone-3f78c.appspot.com",
  messagingSenderId: "280450908039",
  appId: "1:280450908039:web:c803a1a746d0e7f75e1d22",
  measurementId: "G-P56VYQBE0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export {auth,app,firestore,storage};
const analytics = getAnalytics(app);