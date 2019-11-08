import React, { Component } from 'react';
import  { FirebaseContext } from '../database';

const Home = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return <div>I've access to Firebase and render something.</div>;
    }}
  </FirebaseContext.Consumer>
);

// class Home extends Component {
//
//     render() {
//         return (
//             <h1>Home.js</h1>
//         );
//     }
// }

export default Home;
