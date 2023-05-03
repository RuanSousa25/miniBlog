// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTdvKWMKAu7A575YxCBp9zjVASwoz9kqs",
  authDomain: "fir-teste2-1625f.firebaseapp.com",
  projectId: "fir-teste2-1625f",
  storageBucket: "fir-teste2-1625f.appspot.com",
  messagingSenderId: "562969483534",
  appId: "1:562969483534:web:d225974e9e4d0d911b9f5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};