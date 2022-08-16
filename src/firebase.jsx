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
const provider = new firebase.auth.GoogleAuthProvider();
// const db = firebase.getFirestore(app);

export { auth, provider };

