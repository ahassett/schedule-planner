import React, { Component } from 'react';
import ClassList from './components/ClassList';

import './App.css';

class App extends Component {
    render() {
        return (
          <div className="App">
            <h1>Welcome</h1>
            <ClassList/>
          </div>
        );
    }
}

export default App;
