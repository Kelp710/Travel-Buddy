import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore/lite";


const firebaseConfig = {
  apiKey: "AIzaSyBJbYS4hGd6bOpUQRQMMdfv8vk4IgtBZ_g",
  authDomain: "travel-buddy-397b7.firebaseapp.com",
  projectId: "travel-buddy-397b7",
  storageBucket: "travel-buddy-397b7.appspot.com",
  messagingSenderId: "99803071193",
  appId: "1:99803071193:web:c8c0e539309f40d29934c8",

};



const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(app);
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = getFirestore(app);

