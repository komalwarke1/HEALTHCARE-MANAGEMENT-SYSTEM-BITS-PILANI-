// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi6AyoIwPsMfuRngwhclvdxpsP1Qnz1iY",
  authDomain: "healthcare-system-f1e87.firebaseapp.com",
  projectId: "healthcare-system-f1e87",
  storageBucket: "healthcare-system-f1e87.firebasestorage.app",
  messagingSenderId: "87224214540",
  appId: "1:87224214540:web:ddf614378386537c5c3a29",
  measurementId: "G-K2TWFB83C0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();
export const db=getFirestore();
export default app;