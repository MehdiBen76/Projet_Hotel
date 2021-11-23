import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* var firebaseConfig = {
  apiKey: "AIzaSyCJixVriXcYDcTlabxzfo0WWmT9Zab3OeU",
  authDomain: "vue-bureau-etude.firebaseapp.com",
  projectId: "vue-bureau-etude",
  storageBucket: "vue-bureau-etude.appspot.com",
  messagingSenderId: "109097065853",
  appId: "1:109097065853:web:6a5966833a9b0aeffa0014",
  measurementId: "G-Y292D9TBYQ"
}; */
var firebaseConfig = {

  apiKey: "AIzaSyBH574nt5CGXqzn9zXAUGkmbtCa3lYOqPY",

    authDomain: "vue-bureau-etude-4c305.firebaseapp.com",

    projectId: "vue-bureau-etude-4c305",

    storageBucket: "vue-bureau-etude-4c305.appspot.com",

    messagingSenderId: "1041475172252",

    appId: "1:1041475172252:web:e33c69f2fe0770ff2f3a59",

    measurementId: "G-F1YT5ZN0G0"


};

// Initialize Firebase

/* firebase.initializeApp(firebaseConfig);

firebase.analytics(); */

// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();
firebase.analytics();