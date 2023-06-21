// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgiP3-HakwyMnphnNVvXw09mVYAaPkn7A",
  authDomain: "firestore-crud-c9cfc.firebaseapp.com",
  projectId: "firestore-crud-c9cfc",
  storageBucket: "firestore-crud-c9cfc.appspot.com",
  messagingSenderId: "730227269738",
  appId: "1:730227269738:web:5fe1ffbf0fc9c06bed2a13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize firestore
export const db = getFirestore(app);