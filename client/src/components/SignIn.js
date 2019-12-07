import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from './SignUp';
import { withFirebase } from '../database';
import { PasswordForgetLink } from './PasswordForget';
import { AuthUserContext } from '../session';

import AppLogo from './logo.png';

import { Form, Button, Card } from 'react-bootstrap';

import * as ROUTES from '../constants/routes';

const SignInPage = () => (
  <div>
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ?
            <div>
            </div>
            :<div>
                <SignInForm />
            </div>

        }
    </AuthUserContext.Consumer>
  </div>
);
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  // make sure you need this function

  onSubmit = event => {
    const { email, password } = this.state;


    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
          console.log(error.message);
        this.setState({ error });
    });
    event.preventDefault();
   }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';
    return (
<div>
<div>
    <img src={AppLogo} width='500px' height='500px' style={{position:'absolute', left:'365px', top:'80px'}}/>
</div>

              <Card border="primary" text="black" style={{ width: '35rem', top:'120px', left:'880px' }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: '40px' }}>Sign In</Card.Title>
                  <Card.Text>
                      <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isInvalid} block>
                          Log In
                        </Button>
                        {error && <p>{error.message}</p>}
                        <SignUpLink />
                        <PasswordForgetLink/>
                      </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
        <br />
</div>
    );
  }
}

const SignInLink = () => (
  <p>
  Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm, SignInLink }; // added onSubmit function
