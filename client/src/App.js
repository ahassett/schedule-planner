import React, { Component } from 'react';
import ClassList from './components/ClassList';
import ScheduleList from './components/ScheduleList';
import SavedList from './components/SavedList';

import { Tab, Tabs, TabContent, Toast,  Dropdown, Form, Button, FormControl } from 'react-bootstrap';

import uuid from 'uuid';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super ()

    this.state = {
        classes: [
            {
              id: uuid(),
              title: 'cs 701: Senior Seminar',
              description: 'this is a class for seniors.',
              termsOffered: 'Spring 2020',
              timesOffered: 'Monday, Wednesday, Friday 9:00 am - 10:00 am',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'cs 702: Thesis',
              description: 'this is a class for seniors who want to write a thesis.',
              termsOffered: 'Spring 2020, Winter 2020',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          }
        ],
        list_schedules: [],
        button_position: false,
        show: false,
        dropDownMenu: [ 'Winter 2020', 'Spring 2020', 'Fall 2020' ],
        searchedTerm: ''
      };
      this.searchHandler = this.searchHandler.bind(this);

    }

    // adds a new schedule when button is clicked
    createNewSchedule = () => {

      console.log(this.state.button_position);

      let list = this.state.list_schedules.slice();
      let name = 'schedule_'.concat(this.state.list_schedules.length);
      list.push(name);

      this.setState({ list_schedules: list});

      if (this.state.list_schedules.length === 0) {
        this.setState({ button_position: true });
      }

    }

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

    // deletes a schedule when delete icon is clicked
    handleDelete = (item_id) => {
      this.setState(prevState => ({
        list_schedules: prevState.list_schedules.filter(item => item != item_id )
      }));

      this.setState({ show: true });

    }
    searchHandler = (event) => {
        this.setState({searchedTerm: event.target.value})
    }

    render() {
        console.log(this.state.classes)

        const {list_schedules, button_position, show} = this.state;

        return (
          <div className="App">

              <h1>Course Catalog and Schedule</h1>

              <div className='schedule' onScroll={this.handleScroll}>



              {(!button_position) && <button className='temp_button button' onClick={this.createNewSchedule}>New Schedule</button>}


                <div>
                    {button_position && <button className='perm_button button' onClick={this.createNewSchedule}>New Schedule</button>}
                    {
                      list_schedules.map((item, index) => (
                        <ScheduleList id={item} key={item} classes={this.state.classes} delete_callback={this.handleDelete.bind(this, item)} name={item}/> // we can use the key to refer to the schedule clicked
                    ))
                    }
                </div>

                <div className="div_toast">
                    { show && <Toast id="toast" onClose={() => this.setState({ show: false })} show={show} delay={1000} autohide>
                      <Toast.Body>schedule deleted!</Toast.Body>
                    </Toast> }
                </div>

              </div>

              <div className='catalog'>

                  <Form inline style={{position:'absolute', top:'10px', right:'150px'}}>
                    <FormControl onChange={this.searchHandler} value={this.state.searchedTerm} type="text" placeholder="Search" className=" mr-sm-2" />
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
                        <ClassList classes={this.state.classes} searchedTerm={this.state.searchedTerm} selectedTerm={this.state.dropDownMenu[0]} saveClass={this.saveClass}/>
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
