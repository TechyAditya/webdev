import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8wHdsem-DGmoiTNz_9Tr3hMhD_U5_FfU",
    authDomain: "tsc-web-361112.firebaseapp.com",
    databaseURL: "https://tsc-web-361112-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "tsc-web-361112",
    storageBucket: "tsc-web-361112.appspot.com",
    messagingSenderId: "263466741558",
    appId: "1:263466741558:web:35a32980924b5b5fd04d97"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Create users without messing up auth state
export let authApp = firebase.initializeApp(firebaseConfig, 'authApp');
export let detachedAuth = authApp.auth();

// export utils/refs
export const db = firebase.firestore();
export default firebase;