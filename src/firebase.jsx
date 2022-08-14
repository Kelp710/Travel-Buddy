// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBJbYS4hGd6bOpUQRQMMdfv8vk4IgtBZ_g",
//   authDomain: "travel-buddy-397b7.firebaseapp.com",
//   projectId: "travel-buddy-397b7",
//   storageBucket: "travel-buddy-397b7.appspot.com",
//   messagingSenderId: "99803071193",
//   appId: "1:99803071193:web:c8c0e539309f40d29934c8",
//   measurementId: "G-R17J10B23Z"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBJbYS4hGd6bOpUQRQMMdfv8vk4IgtBZ_g",
  authDomain: "travel-buddy-397b7.firebaseapp.com",
  projectId: "travel-buddy-397b7",
  storageBucket: "travel-buddy-397b7.appspot.com",
  messagingSenderId: "99803071193",
  appId: "1:99803071193:web:c8c0e539309f40d29934c8",

};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
// const db = firebase.getFirestore(app);

export { auth};

