// Import the functions you need from the SDKs you need
import app from "firebase/app";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBffYw8ZezR8V_WOQRx5y3WyQsfzn3tCms",
  authDomain: "proyecto-react-native-ad2e4.firebaseapp.com",
  projectId: "proyecto-react-native-ad2e4",
  storageBucket: "proyecto-react-native-ad2e4.appspot.com",
  messagingSenderId: "318583757951",
  appId: "1:318583757951:web:1423cc4b2afc97ec8df34a"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const storage = app.storage();
export const auth = firebase.auth();
export const db = app.firestore();