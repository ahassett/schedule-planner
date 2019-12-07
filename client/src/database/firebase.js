import app from 'firebase/app';
import 'firebase/auth'; // implement the authentication API
import 'firebase/database'; // implement the database API

import logClassesInfo from '../constants/scraped';


const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase { // connects interaciton between React and Firebase
  constructor() {
    app.initializeApp(config); // only needs initilaizing once

    this.auth = app.auth();
    this.db = app.database();
  }

  // authentication API

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // user API
  user = uid => this.db.ref(`users/${uid}`); // specific user
  users = () => this.db.ref('users'); // all users

  // classes API
  class = uid => this.db.ref(`classes/${uid}`); // specific class;
  classes = () => this.db.ref('classes');

  }

export default Firebase;
