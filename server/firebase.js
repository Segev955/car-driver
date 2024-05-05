const { initializeApp, firestore } = require('firebase');

firebaseConfig = {
    apiKey: "AIzaSyDmMM53fHunacpKk28NVU2gCOzwaf8xRdE",
    authDomain: "car-driver-bc91f.firebaseapp.com",
    projectId: "car-driver-bc91f",
    storageBucket: "car-driver-bc91f.appspot.com",
    messagingSenderId: "759661383814",
    appId: "1:759661383814:web:8cf7aacf466a18f130c107",
    measurementId: "G-4ZFD3NLVRW"
  };
 // Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = firestore();

module.exports = { db };