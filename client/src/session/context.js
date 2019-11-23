import React from 'react';

// use the React Context API to pass down the Firebase instance to any component
const AuthUserContext = React.createContext(null);

export default AuthUserContext;
