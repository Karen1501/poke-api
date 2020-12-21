import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAJZVSFDj82_gs0T_D1lKLTScCpDQPoRt4",
  authDomain: "poke-api-5ca67.firebaseapp.com",
  projectId: "poke-api-5ca67",
  storageBucket: "poke-api-5ca67.appspot.com",
  messagingSenderId: "421361252697",
  appId: "1:421361252697:web:5a70bff14d56b123273448",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
