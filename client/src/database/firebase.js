// const config = {
//   apiKey: 'AIzaSyBbHIT3RJRFG95doFIrj0_or5IClHs-HVg',
//   authDomain: 'schedule-planner-1f461.firebaseapp.com',
//   databaseURL: 'https://schedule-planner-1f461.firebaseio.com',
//   projectId: 'schedule-planner-1f461',
//   storageBucket: '',
//   messagingSenderId: '203514915297',
// };

import app from 'firebase/app';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

// initializing firebase

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
