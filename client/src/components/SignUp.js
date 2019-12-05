import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignInLink } from './SignIn';

import { withFirebase } from '../database';
import * as ROUTES from '../constants/routes';

import { Form, Button, Card } from 'react-bootstrap';
import AppLogo from './logo.png';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
      const { username, email, passwordOne } = this.state;
       this.props.firebase
         .doCreateUserWithEmailAndPassword(email, passwordOne)
         .then(authUser => {
           // Create a user in your Firebase realtime database
           return this.props.firebase
             .user(authUser.user.uid)
             .set({
               username,
               email,
             });
         })
         .catch(error => {
           this.setState({ error });
         });
       event.preventDefault(); // prevents from reloading site
  }

  onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  };

  render() {
      const { username, email, passwordOne, passwordTwo, error } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

    return (
        <div>
            <div>
                <img src={AppLogo} width='500px' height='500px' style={{position:'absolute', left:'365px', top:'80px'}}/>
            </div>

        <Card border="primary" text="black" style={{ width: '35rem', top:'80px', left:'880px' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '40px' }}>Sign Up</Card.Title>
            <Card.Text>
                <Form onSubmit={this.onSubmit}>

                  <Form.Group controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control name="username" value={username} onChange={this.onChange} type="text" placeholder="Full Address" />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" />
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={isInvalid} block>
                    Sign Up
                  </Button>
                  <SignInLink />
                 {error && <p>{error.message}</p>}
                </Form>
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
