import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export const firebaseConfig = {
    apiKey: "AIzaSyBPGa2QRSfvGMLVSgvPeCYRX_fJL7zdex8",
    authDomain: "joobleinterviewfrontend.firebaseapp.com",
    databaseURL: "https://joobleinterviewfrontend.firebaseio.com",
    projectId: "joobleinterviewfrontend",
    storageBucket: "joobleinterviewfrontend.appspot.com",
    messagingSenderId: "84956270178",
    appId: "1:84956270178:web:65528f215c98826a"
};

export const config = {
    userProfile: null,
    enableLogging: false,
    useFirestoreForProfile: true
};

export const collection = 'medicines_denis';

firebase.initializeApp(firebaseConfig);
// firebase.firestore();

export default firebase;
