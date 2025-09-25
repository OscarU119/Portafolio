// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdcISSCskDkSw4s2LyoWmV7Tv1jshq93Y",
  authDomain: "prueba1-60a04.firebaseapp.com",
  projectId: "prueba1-60a04",
  storageBucket: "prueba1-60a04.firebasestorage.app",
  messagingSenderId: "219447815214",
  appId: "1:219447815214:web:3e0401e7fef6430b2f43bf",
  measurementId: "G-TDBX9HEEME"
};

// Initialize Firebases
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase