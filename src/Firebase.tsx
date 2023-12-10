// import firebase library
import {FirebaseApp, initializeApp} from "firebase/app";
import {Auth, getAuth} from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore"

// export firebase service variables
export const firebase : FirebaseApp = initializeApp({
    apiKey: "AIzaSyAuqZeEdokFkX8u3QpBPeMvDUN2VVBJRP8",
    authDomain: "react-game-lobby-4e90c.firebaseapp.com",
    projectId: "react-game-lobby-4e90c",
    storageBucket: "react-game-lobby-4e90c.appspot.com",
    messagingSenderId: "931358380429",
    appId: "1:931358380429:web:cb391f7d4ba579ec772dc4",
    measurementId: "G-KN1S8Z8BQE"
});

export const auth : Auth = getAuth(firebase);
export const firestore : Firestore = getFirestore(firebase);