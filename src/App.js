import React, { Component } from 'react';
import ClassList from './components/ClassList';
import ScheduleList from './components/ScheduleList';
import { Tab, Tabs, TabContent } from 'react-bootstrap';

import uuid from 'uuid';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    state = {
        classes: [
            {
                id: uuid(),
                title: 'cs 701: Senior Seminar',
                description: 'this is a class for seniors.',
                saved: false
            },
            {
                id: uuid(),
                title: 'cs 702: Thesis',
                description: 'this is a class for seniors who want to write a thesis.',
                saved: false
            }
        ]
    }

    render() {
        console.log(this.state.classes)
        return (
          <div className="App">

              <h1>Welcome Back!</h1>

              <div className='schedule'>
                <ScheduleList />
              </div>

              <div className='catelog'>
                <ClassList classes={this.state.classes}/>
              </div>
          </div>
        );
    }
}

export default App;
