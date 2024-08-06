
import { initializeApp } from "firebase/app";
import { getDatabase  } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDmMM53fHunacpKk28NVU2gCOzwaf8xRdE",
  authDomain: "car-driver-bc91f.firebaseapp.com",
  databaseURL: "https://car-driver-bc91f-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "car-driver-bc91f",
  storageBucket: "car-driver-bc91f.appspot.com",
  messagingSenderId: "759661383814",
  appId: "1:759661383814:web:8cf7aacf466a18f130c107",
  measurementId: "G-4ZFD3NLVRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { database, storage };