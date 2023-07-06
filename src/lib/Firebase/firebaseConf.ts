// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzTedZ3-720u6hfeqWFErA5VXUCZnjs2Y",
  authDomain: "cyber-blogs-b1a52.firebaseapp.com",
  projectId: "cyber-blogs-b1a52",
  storageBucket: "cyber-blogs-b1a52.appspot.com",
  messagingSenderId: "921860967396",
  appId: "1:921860967396:web:6d93fb970baac66b9c55f1",
  measurementId: "G-J6WHD1TDM3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);