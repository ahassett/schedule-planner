import React, { Component } from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../database';

const withAuthentication = Component => {
    class WithAuthentication extends Component {
        constructor(props) {
          super(props);
            this.state = {
               authUser: null,
             };
        }

        componentDidMount() {
          this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
              authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
            },
          );
        }

        componentWillUnmount(){
            this.listener();
        }

        render() {
            return (
                 <AuthUserContext.Provider value={this.state.authUser}>
                   <Component {...this.props} />
                 </AuthUserContext.Provider>
           );
        }
    }
    return withFirebase(WithAuthentication);
};

// contains all loigic that deals with the authenticated user
export default withAuthentication;
