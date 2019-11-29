import React, { Component } from 'react';
import  { withAuthorization } from '../session';

const Home = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
