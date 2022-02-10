import react from "react";
// import * as firebase from "firebase"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"



const firebaseConfig = {
  apiKey: "AIzaSyC1ctkssTa2dr_ZPMZciN-kGvZmWxM1xBc",
  authDomain: "chatapplication-a0a7a.firebaseapp.com",
  projectId: "chatapplication-a0a7a",
  storageBucket: "chatapplication-a0a7a.appspot.com",
  messagingSenderId: "149622214073",
  appId: "1:149622214073:web:1ecf25e3c0aafc4e27ba68",
  measurementId: "G-XXWG65TBJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,db,storage};


