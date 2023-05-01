// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByefZdVsEw8V7VLgUiD943veMBICzDOYc",
  authDomain: "chat-app-adv-87005.firebaseapp.com",
  projectId: "chat-app-adv-87005",
  storageBucket: "chat-app-adv-87005.appspot.com",
  messagingSenderId: "724125004532",
  appId: "1:724125004532:web:e88180b3caecf272d564a1",
  measurementId: "G-GF4K6C6X9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);