import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../database';
import * as ROUTES from '../constants/routes';
import { SignInLink } from './SignIn';
import { SignUpLink } from './SignUp';
import { Form, Button, Card } from 'react-bootstrap';

import AppLogo from './logo.png';

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);
const INITIAL_STATE = {
  email: '',
  error: null,
};
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
        <div>

            <div>
                <img src={AppLogo} width='500px' height='500px' style={{position:'absolute', left:'365px', top:'80px'}}/>
            </div>


      <Card border="primary" text="black" style={{ padding:'65px', width: '35rem', top:'120px', left:'880px' }}>
        <Card.Body>
          <Card.Title style={{ fontSize: '40px' }}>Reset Password</Card.Title>
          <Card.Text>
              <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label></Form.Label>
                  <Form.Control name="email" value={this.state.email} onChange={this.onChange} type="text" placeholder="Email Address" />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isInvalid} block>
                  Send Reset Link
                </Button>
                {error && <p>{error.message}</p>}
                <SignInLink/>
              </Form>
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    );
  }
}
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };
