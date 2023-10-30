// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
//  https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCvzZLRwUs_g3lb2t1I2j-8K_V12dKb3e4",
  authDomain: "hospitalapp-dece6.firebaseapp.com",
  projectId: "hospitalapp-dece6",
  storageBucket: "hospitalapp-dece6.appspot.com",
  messagingSenderId: "947518149548",
  appId: "1:947518149548:web:1d4a4694bdecbdb6d12009",
  measurementId: "G-G9WDR00CZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);