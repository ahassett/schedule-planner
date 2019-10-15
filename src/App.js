import React, { Component } from 'react';
import ClassList from './components/ClassList';
import ScheduleList from './components/ScheduleList';
import SavedList from './components/SavedList';

import { Tab, Tabs, TabContent } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

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
        ],
      list_schedules: []

    }

    // adds a new schedule when button is clicked
    createNewSchedule = () => {
      let list = this.state.list_schedules.slice();
      let name = 'schedule_'.concat(this.state.list_schedules.length);
      list.push(name);

      this.setState({ list_schedules: list});
    }

    saveClass = (id) => {
        console.log(id);
        this.setState({ classes: this.state.classes.map(classname => {
            if(classname.id === id){
                classname.saved = !classname.saved
            }
            return classname;
        })})

    }
    showSaved = (classname) => {
        console.log('hello')
        const savedClasses = this.state.classes.filter((classname) => {
            classname.saved = true;
        })
        console.log('entered showSaved');
        return savedClasses;
    }

    render() {
        console.log(this.state.classes)
        return (
          <div className="App">

              <h1>Welcome Back!</h1>

              <div className='schedule'>
                <div>
                    <Button variant='primary' className='new-schedule-button' onClick={this.createNewSchedule}>New Schedule</Button>
                    {
                      this.state.list_schedules.map((item, index) => (
                        <ScheduleList key={item}/> // we can use the key to refer to the schedule clicked
                    ))
                    }
                </div>
                <div id="schedules">
                </div>

              </div>

              <div className='catalog'>
                  <Tabs defaultActiveKey={this.state.activeTab} id="tabs" onSelect={this.handleSelect} style={{'marginTop':'20px'}}>
                    <Tab eventKey='1' title="Catalog">
                        <ClassList classes={this.state.classes} saveClass={ this.saveClass }/>
                    </Tab>
                    <Tab eventKey='2' title="Saved Classes">
                        <SavedList classes={this.state.classes} />
                    </Tab>
                    </Tabs>
              </div>
          </div>
        );
    }
}

export default App;
