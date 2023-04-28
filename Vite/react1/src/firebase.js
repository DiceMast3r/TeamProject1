// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBhG_2Yuxhhov8GzSMvX_3zfx1k58vcNs",
  authDomain: "node-demo-73dd9.firebaseapp.com",
  databaseURL: "https://node-demo-73dd9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "node-demo-73dd9",
  storageBucket: "node-demo-73dd9.appspot.com",
  messagingSenderId: "844420725095",
  appId: "1:844420725095:web:1b9bd872edae10595417c2",
  measurementId: "G-KRHHBZBKQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);