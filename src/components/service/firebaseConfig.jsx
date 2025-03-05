// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW4ORNYOzPkE5-YRAIIglKGsERWMTR0pI",
  authDomain: "trip-planner-ce82e.firebaseapp.com",
  projectId: "trip-planner-ce82e",
  storageBucket: "trip-planner-ce82e.firebasestorage.app",
  messagingSenderId: "167242077726",
  appId: "1:167242077726:web:f6d78b7ed1647c5445c00f",
  measurementId: "G-LXGP8RB4M4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);