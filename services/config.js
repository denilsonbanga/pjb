import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAn2CgOd1_D4tAnVrRUngUu6Nm_0FMEkEQ",
  authDomain: "dicio-2f074.firebaseapp.com",
  databaseURL: "https://dicio-2f074-default-rtdb.firebaseio.com",
  projectId: "dicio-2f074",
  storageBucket: "dicio-2f074.appspot.com",
  messagingSenderId: "197472094959",
  appId: "1:197472094959:web:1c66f04e8b6e7bfe85691a",
  measurementId: "G-6XF6GN2C6H"
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();