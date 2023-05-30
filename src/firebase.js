import firebase from 'firebase/app';
import 'firebase/firestore'
//import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCRil_9HhL2UwrcLGLG5ooT3RFKwls6VXQ",
  authDomain: "medidor-agua-b5a83.firebaseapp.com",
  databaseURL: "https://medidor-agua-b5a83-default-rtdb.firebaseio.com",
  projectId: "medidor-agua-b5a83",
  storageBucket: "medidor-agua-b5a83.appspot.com",
  messagingSenderId: "483811688154",
  appId: "1:483811688154:web:5d84bc4bd650a9252cefe3"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export {firebase}