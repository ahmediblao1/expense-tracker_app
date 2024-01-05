// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6VmWYkEJFaiuN8-dFuEObKgBHraNvD3c",
  authDomain: "expense-tracker-a4f1e.firebaseapp.com",
  projectId: "expense-tracker-a4f1e",
  storageBucket: "expense-tracker-a4f1e.appspot.com",
  messagingSenderId: "970982332717",
  appId: "1:970982332717:web:cc3d56b56e9b0eda45dba4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);