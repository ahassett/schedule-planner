import React, { Component } from 'react';
import ClassList from './components/ClassList';
import ScheduleList from './components/ScheduleList';
import SavedList from './components/SavedList';

import { Tab, Tabs, TabContent, Toast,  Dropdown, Form, Button, FormControl } from 'react-bootstrap';

import uuid from 'uuid';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';

import SignOutButton from './components/SignOut';

import * as ROUTES from './constants/routes';

import { withAuthentication } from './session';
import { withFirebase } from './database';

function subtractTime(time_str){

  let first = time_str.slice(0, time_str.indexOf(':'))
  let second = time_str.slice(time_str.lastIndexOf(':') - 2, time_str.lastIndexOf(':')).replace(/-/gi, '')

  let firstMins = time_str.slice(time_str.indexOf(':') + 1, time_str.indexOf(':') + 3)
  let secondMins = time_str.slice(time_str.lastIndexOf(':') + 1, time_str.lastIndexOf(':') + 3)

  first = parseInt(second) - parseInt(first)
  firstMins = parseInt(secondMins) - parseInt(firstMins)

  if (firstMins < 0){
    first -= 1
    firstMins = 60 + firstMins
  }

  first *= 60
  first += firstMins

  return first

}

function populateSchedule(courses) {
  let prev_time = [0] // the zero jump starts the loop  below
  let all_courses = []
  let formatted = []
  let slots = [
    {time: '8:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '9:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '10:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '11:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '12:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '1:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '2:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '3:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '4:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''}
  ]

  courses.forEach((course, index) => {
    let day_time = course.timesOffered
    let course_number = course.title.substring(0, course.title.indexOf('-') -1)
    let dash_loc, course_time, time_array = [], classId = index

    while(day_time.includes('-')) {
      dash_loc = day_time.indexOf('-')
      time_array.push(day_time.substring(0, dash_loc + 10))
      day_time = day_time.substring(dash_loc + 11)
    }

    time_array.forEach(time_item => {
      let time = '', mon = '', tues = '', wed = '', thurs = '', fri = '', end = 0, hr = 0, day

      time_item = time_item.replace(/ am/gi, '')
      time_item = time_item.replace(/ pm/gi, '')

      dash_loc = time_item.indexOf('-')

      let time_str = time_item.substring(dash_loc - 6).replace(/ /gi, '')

      hr = subtractTime(time_str)

      let item_array = time_item.substring(0, dash_loc - 1).split(' ')

      item_array.forEach(item => {

        if (!parseInt(item.slice(0, 1))) {

          if (item.slice(0, 1) === 'T') {
            end = 4
          } else {
            end = 3
          }

          day = item.slice(0, end)
          course_time = time_str + ' ' + course_number.replace(' ', '') + ' ' + 'PLACES' + ' ' + 'CRN0000'

          if (day === 'Mon') {
            mon = course_time
          } else if (day === 'Tues') {
            tues = course_time
          } else if (day === 'Wed') {
            wed = course_time
          } else if (day === 'Thur') {
            thurs = course_time
          } else if (day === 'Fri') {
            fri = course_time
          }

        } else {

          let num = item.slice(0, item.indexOf(':'))

          if (['8', '9', '10', '11'].includes(num)) {
            time = item + ' am'
          } else {
            time = item + ' pm'
          }
        }
      })
      console.log({time: time, Mon: mon, Tues: tues, Wed: wed, Thurs: thurs, Fri: fri, class_id: classId, hrs: hr});
      prev_time.forEach(previous => {
        if (!prev_time.includes(time)) {
          all_courses.push({time: time, Mon: mon, Tues: tues, Wed: wed, Thurs: thurs, Fri: fri, class_id: classId, hrs: hr})
          prev_time.push(time)
        }
      })

    })

  })
  console.log(all_courses);
      slots.forEach(slot => {
        if(prev_time.includes(slot.time)) {
          formatted.push(all_courses.filter(item_course => item_course.time === slot.time).pop())
        } else {
          formatted.push(slot)
        }
      })
  return formatted

}

class App extends Component {


  constructor() {
    super ()

    this.state = {
        classes: [],
        list_schedules: [],
        button_position: false,
        show: false,
        dropDownMenu: [ 'Spring 2019', 'Fall 2019', 'Spring 2020'],
        searchedTerm: '',
        added_classes: [],
        formatted_classes: [],
        scheduleEmpty: true
      };

      this.searchHandler = this.searchHandler.bind(this);

    }

    componentDidMount() {
        this.props.firebase.classes().on('value', snapshot => {
                const classObject = snapshot.val()
                if (classObject) {
                    const classList = Object.keys(classObject).map(key => ({
                      ...classObject[key],
                      id: uuid(),
                    }));
                    console.log(classList)
                    this.setState({
                      classes: classList
                    });
                }
            })
        }

    // adds a new schedule when button is clicked
    createNewSchedule = () => {

      let list = this.state.list_schedules.slice();
      let name = 'schedule_'.concat(this.state.list_schedules.length);
      list.push(name);

      this.setState({ list_schedules: list});

      if (this.state.list_schedules.length === 0) {
        this.setState({ button_position: true });
      }

    }

    saveClass = (id) => {
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
      let temp_list = [], removed = [], new_class = []; // have to be lists in case a class has a lab they will be added together

      this.setState({ classes: this.state.classes.map(classname => {
          if(classname.id === id){
              classname.added = !classname.added
          }

          if (classname.added === true) {

            if (!this.state.added_classes.includes(classname)){
              new_class.push(classname)
            }

          } else {

            if (this.state.added_classes.includes(classname)){
              removed.push(classname)
            }

          }
          return classname;
      })})

      temp_list = this.state.added_classes.slice()

      if (removed) {
        removed.forEach(remove => {
          temp_list = temp_list.filter(item => item.title !== remove.title)
        })
      }

      if (new_class) {
        new_class.forEach(newClass => {
          temp_list.push(newClass)
        })
      }

      this.setState({scheduleEmpty: !temp_list.length})
      this.setState({added_classes: temp_list})
      this.setState({formatted_classes: populateSchedule(temp_list)})

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
        const {list_schedules, button_position, show} = this.state;

        return (
          <div className="App">

              <h1>Course Catalog and Schedule</h1>

                  <Router>
                    <div>
                      <Navigation />
                      <hr />

                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                        <Route path={ROUTES.HOME} component={HomePage} />
                        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                        <Route path={ROUTES.ADMIN} component={AdminPage} />

                    </div>
                  </Router>

              <div className='schedule'>

              {(!button_position) && <button className='temp_button button' onClick={this.createNewSchedule}>New Schedule</button>}

                <div>
                    {button_position && <button className='perm_button button' onClick={this.createNewSchedule}>New Schedule</button>}
                    {
                      list_schedules.map((item, index) => (
                        <ScheduleList id={item} key={item} classes={this.state.formatted_classes} delete_callback={this.handleDelete.bind(this, item)} name={item} isEmpty={this.state.scheduleEmpty}/> // we can use the key to refer to the schedule clicked
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

                  <Form inline className="sticky" style={{position:'absolute', top:'10px', right:'150px'}}>
                    <FormControl onChange={this.searchHandler} value={this.state.searchedTerm} type="text" placeholder="Search" className=" mr-sm-2" />
                  </Form>

                  <Dropdown className="sticky" style={{position:'absolute', top:'10px', right:'15px'}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {this.state.dropDownMenu[0]}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.dropDownDisplay.bind(this, this.state.dropDownMenu[1])}>{this.state.dropDownMenu[1]}</Dropdown.Item>
                      <Dropdown.Item onClick={this.dropDownDisplay.bind(this, this.state.dropDownMenu[2])}>{this.state.dropDownMenu[2]}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Tabs defaultActiveKey={this.state.activeTab} className="stickynav" id="tabs" style={{marginTop:'20px', position: 'sticky', top:'0px'}}>
                    <Tab eventKey='1' title="Catalog">
                        <ClassList classname='scrollable' classes={this.state.classes} searchedTerm={this.state.searchedTerm} selectedTerm={this.state.dropDownMenu[0]} saveClass={this.saveClass}/>
                    </Tab>
                    <Tab eventKey='2' title="Saved Classes">
                        <SavedList className='scrollable' classes={this.state.classes} searchedTerm={this.state.searchedTerm} selectedTerm={this.state.dropDownMenu[0]} saveClass={this.saveClass} addClass={this.addClass} lockClass={this.lockClass}/>
                    </Tab>
                    </Tabs>
              </div>
          </div>
        );
    }
}

export default withAuthentication(App);
