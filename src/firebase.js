import React from 'react';
import * as firebase from 'firebase';
import { compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import FirebaseContext, { withFirebase } from './components/HOC/withFirebase';
import {credential} from "firebase-admin";

const firebaseConfig = {
    apiKey: "AIzaSyBPGa2QRSfvGMLVSgvPeCYRX_fJL7zdex8",
    authDomain: "joobleinterviewfrontend.firebaseapp.com",
    databaseURL: "https://joobleinterviewfrontend.firebaseio.com",
    projectId: "joobleinterviewfrontend",
    storageBucket: "joobleinterviewfrontend.appspot.com",
    messagingSenderId: "84956270178",
    appId: "1:84956270178:web:65528f215c98826a"
};

const config = {
    userProfile: 'users', // firebase root where user profiles are stored
    enableLogging: false, // enable/disable Firebase's database logging
};

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
    }

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)
            .then(data => console.log(data));
    doSignOut = () => this.auth.signOut();
}


export { FirebaseContext, withFirebase };
export default Firebase;

