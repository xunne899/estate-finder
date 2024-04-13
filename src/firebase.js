// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtWR4KXPXVz9ZuAxHFZ1sPzqVXrdJCKQQ",
    authDomain: "property-finder-react.firebaseapp.com",
    projectId: "property-finder-react",
    storageBucket: "property-finder-react.appspot.com",
    messagingSenderId: "237396430769",
    appId: "1:237396430769:web:8a12f5873dc7ef3f177790"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();