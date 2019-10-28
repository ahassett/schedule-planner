import React, { Component } from 'react';
import ClassList from './components/ClassList';
import ScheduleList from './components/ScheduleList';
import SavedList from './components/SavedList';

import { Tab, Tabs, TabContent, Dropdown, Form, Button, FormControl } from 'react-bootstrap';

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
                termsOffered: 'Spring 2020',
                saved: false,
                added: false,
                locked: false
            },
            {
                id: uuid(),
                title: 'cs 702: Thesis',
                description: 'this is a class for seniors who want to write a thesis.',
                termsOffered: 'Spring 2020, Winter 2020',
                saved: false,
                added: false,
                locked: false
            }
        ],
        dropDownMenu: [ 'Winter 2020', 'Spring 2020', 'Fall 2020' ]
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

                if(classname.saved === false) {
                    classname.added = false
                    classname.locked = false
                }
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

    dropDownDisplay = (selectedClass) => {
        console.log(selectedClass)
        const dropDown = this.state.dropDownMenu
        if (this.state.dropDownMenu.includes(selectedClass)) {
            const swapIndex = dropDown.indexOf(selectedClass)
            const temp = dropDown[0]

            dropDown[0] = dropDown[swapIndex]
            dropDown[swapIndex] = temp
        }
        this.setState({ dropDownMenu: dropDown })
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

                  <Form inline style={{position:'absolute', top:'10px', right:'150px'}}>
                    <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                  </Form>

                  <Dropdown style={{position:'absolute', top:'10px', right:'15px'}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {this.state.dropDownMenu[0]}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.dropDownDisplay.bind(this, this.state.dropDownMenu[1])}>{this.state.dropDownMenu[1]}</Dropdown.Item>
                      <Dropdown.Item onClick={this.dropDownDisplay.bind(this, this.state.dropDownMenu[2])}>{this.state.dropDownMenu[2]}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Tabs defaultActiveKey={this.state.activeTab} id="tabs" style={{'marginTop':'20px'}}>
                    <Tab eventKey='1' title="Catalog">
                        <ClassList classes={this.state.classes} selectedTerm={this.state.dropDownMenu[0]} saveClass={this.saveClass}/>
                    </Tab>
                    <Tab eventKey='2' title="Saved Classes">
                        <SavedList classes={this.state.classes} selectedTerm={this.state.dropDownMenu[0]} saveClass={this.saveClass} addClass={this.addClass} lockClass={this.lockClass}/>
                    </Tab>
                    </Tabs>
              </div>
          </div>
        );
    }
}

export default App;
