// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  where ,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5at0EQ5xEaKcGjgoW9oEXC3uNaCRiAMc",
  authDomain: "chat-app-3713f.firebaseapp.com",
  databaseURL: "https://chat-app-3713f-default-rtdb.firebaseio.com",
  projectId: "chat-app-3713f",
  storageBucket: "chat-app-3713f.firebasestorage.app",
  messagingSenderId: "334284705559",
  appId: "1:334284705559:web:b8577e109907944f5e3152",
  measurementId: "G-W8ZB6VWFXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);
// export const storageRef=getFirestore(app);
export default app;
export {  collection, addDoc, query, orderBy, onSnapshot, where, getDocs , doc , getDoc};
