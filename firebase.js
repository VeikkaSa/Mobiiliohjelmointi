// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcUIx6_TM9cDG2l4Kaj7Up5MHaGUfRpCo",
  authDomain: "mobiiliohjelmointi-7f484.firebaseapp.com",
  projectId: "mobiiliohjelmointi-7f484",
  storageBucket: "mobiiliohjelmointi-7f484.appspot.com",
  messagingSenderId: "957068809822",
  appId: "1:957068809822:web:ddde739cd41b2a94aa06cf"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };