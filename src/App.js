import React, { Component } from 'react';
import ClassList from './components/ClassList';
import ScheduleList from './components/ScheduleList';
import SavedList from './components/SavedList';

import { Tab, Tabs, TabContent, Toast } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

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
                saved: false
            },
            {
                id: uuid(),
                title: 'cs 702: Thesis',
                description: 'this is a class for seniors who want to write a thesis.',
                saved: false
            }
        ],
        list_schedules: [],
        button_position: false,
        show: false
      };

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

    // deletes a schedule when delete icon is clicked
    handleDelete = (item_id) => {
      this.setState(prevState => ({
        list_schedules: prevState.list_schedules.filter(item => item != item_id )
      }));

      this.setState({ show: true });

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
                        <ScheduleList id={item} key={item} delete_callback={this.handleDelete.bind(this, item)} name={item}/> // we can use the key to refer to the schedule clicked
                    ))
                    }
                </div>

                { show && <Toast id="toast" onClose={() => this.setState({ show: false })} show={show} delay={1000} autohide>
                  <Toast.Body>schedule deleted!</Toast.Body>
                </Toast> }

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
