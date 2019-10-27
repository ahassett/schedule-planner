import React, { Component } from 'react';
import ClassList from './components/ClassList';
import ScheduleList from './components/ScheduleList';
import SavedList from './components/SavedList';

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
                saved: false,
                added: false,
                locked: false
            },
            {
                id: uuid(),
                title: 'cs 702: Thesis',
                description: 'this is a class for seniors who want to write a thesis.',
                saved: false,
                added: false,
                locked: false
            }
        ]
    }

    componentDidMount() {
    // call our fetch function below once the component mounts
      this.callBackendAPI()
        .then(res => console.log('success!'))
        .catch(err => console.log(err));
    }

    // fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
    };

    saveClass = (id) => {
        console.log(id);
        this.setState({ classes: this.state.classes.map(classname => {
            if(classname.id === id){
                classname.saved = !classname.saved
            }
            return classname;
        })})

    }
    addClass = (id) => {
        console.log(id);
        this.setState({ classes: this.state.classes.map(classname => {
            if(classname.id === id){
                classname.added = !classname.added
            }
            return classname;
        })})
    }
    lockClass = (id) => {
        console.log(id);
        this.setState({ classes: this.state.classes.map(classname => {
            if(classname.id === id){
                classname.locked = !classname.locked
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
                <ScheduleList />
              </div>

              <div className='catalog'>
                  <Tabs defaultActiveKey={this.state.activeTab} id="tabs" onSelect={this.handleSelect} style={{'marginTop':'20px'}}>
                    <Tab eventKey='1' title="Catalog">
                        <ClassList classes={this.state.classes} saveClass={this.saveClass}/>
                    </Tab>
                    <Tab eventKey='2' title="Saved Classes">
                        <SavedList classes={this.state.classes} addClass={this.addClass} lockClass={this.lockClass}/>
                    </Tab>
                    </Tabs>
              </div>
          </div>
        );
    }
}

export default App;
