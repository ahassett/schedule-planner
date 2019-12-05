import React from 'react';
import { withFirebase } from '../database';
import { Button } from 'react-bootstrap';

const SignOutButton = ({ firebase }) => (
    <Button variant="light" size="lg" style={{ top:'55px'}} onClick={firebase.doSignOut}> Sign Out </Button>
);

export default withFirebase(SignOutButton);
