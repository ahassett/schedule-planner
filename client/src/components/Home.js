import React, { Component } from 'react';
import  { withAuthorization, withAuthentication } from '../session';
import { withFirebase } from '../database';

import ClassList from './ClassList';
import ScheduleList from './ScheduleList';
import SavedList from './SavedList';
import SignOutButton from './SignOut';

import AppLogo from './logo.png';

import { AuthUserContext } from '../session';

import { Tab, Tabs, TabContent, Toast,  ButtonGroup, ToggleButton, DropdownButton, SplitButton, Dropdown, Form, Button, FormControl, Nav } from 'react-bootstrap';

import uuid from 'uuid';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// https://ssb-prod.ec.middlebury.edu/PNTR/saturn_midd.course_catalog_utlq.catalog_page_by_dept?p_term=201990&p_course_subj_code=AMST

// functions
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
    {time: '8:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, hrs: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, mins: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}},
    {time: '9:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, hrs: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, mins: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}},
    {time: '10:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, hrs: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, mins: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}},
    {time: '11:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, hrs: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, mins: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}},
    {time: '12:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, hrs: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, mins: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}},
    {time: '1:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, hrs: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, mins: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}},
    {time: '2:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, hrs: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, mins: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}},
    {time: '3:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, hrs: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, mins: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}},
    {time: '4:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, hrs: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}, mins: {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}}
  ]
  let result, detailsToDisplay = []

  courses.forEach((course, index) => {
    let day_time = course.timesOffered
    let course_number = course.title.substring(0, course.title.indexOf(':'))
    let dash_loc, course_time, time_array = [], classId = index

    while(day_time.includes('-')) {
      dash_loc = day_time.indexOf('-')
      time_array.push(day_time.substring(0, dash_loc + 10))
      day_time = day_time.substring(dash_loc + 11)
    }

    time_array.forEach(time_item => {
      let time = '', mon = '', tues = '', wed = '', thurs = '', fri = '', end = 0, hr = 0, min = 0, day

      time_item = time_item.replace(/ am/gi, '')
      time_item = time_item.replace(/ pm/gi, '')

      dash_loc = time_item.indexOf('-')

      let time_str = time_item.substring(dash_loc - 6).replace(/ /gi, '')

      hr = subtractTime(time_str)
      min = time_str.slice(time_str.indexOf(':') + 1, time_str.indexOf(':') + 3)

      let item_array = time_item.substring(0, dash_loc - 1).split(' ')

      item_array.forEach(item => {

        if (!parseInt(item.slice(0, 1))) {

          if (item.slice(0, 1) === 'T') {
            end = 4
          } else {
            end = 3
          }

          day = item.slice(0, end)
          course_time = time_str + ' ' + course_number.replace(' ', '') + ' ' + 'PLACES' + ' ' + 'CRN:' + course.crn + ' '

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

      // checks time conflict
      prev_time.forEach(previous => {
        let loop = false;

        let checkList = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'], newclass, check = [];
        [mon, tues, wed, thurs, fri].filter((item, index) => {
          if (item !== '') {
            check.push(checkList[index])
            newclass = item
          }
        })


        // if there s a time conflict check if classes also have a conflict, if not merge classes
        if (prev_time.includes(time.slice(0, time.indexOf(':')))) {

          let filtered = (all_courses.filter(acourse => acourse.time.slice(0, acourse.time.indexOf(':')) === time.slice(0, time.indexOf(':'))))[0]
          let temp_details

          // let tempKeys = Object.keys(filtered).filter(key => filtered[key] !== '')
          //
          // tempKeys.forEach(itemkey => {
          //   check.forEach(itemcheck => {
          //     if (itemkey === itemcheck) {
          //       loop = true
          //     }
          //   })
          // })
          //
          // if (!loop) {

            Object.keys(filtered).forEach(filter => {
              // if merging the two objects with same time if there is no conflict in days offered
              // for each add class-id, hrs and mins of the new courses in the object  //

              if (filtered[filter] === ''){

                if (filter === 'Mon' && mon !== '' && check.includes(filter)) {

                  filtered[filter] = mon
                  filtered.class_id = {...filtered.class_id, Mon: classId}
                  filtered.hrs = {...filtered.hrs, Mon: hr}
                  filtered.mins = {...filtered.mins, Mon: min}

                } else if (filter === 'Tues' && tues !== '' && check.includes(filter)) {

                  filtered[filter] = tues
                  filtered.class_id = {...filtered.class_id, Tues: classId}
                  filtered.hrs = {...filtered.hrs, Tues: hr}
                  filtered.mins = {...filtered.mins, Tues: min}

                } else if (filter === 'Wed' && wed !== '' && check.includes(filter)) {

                  filtered[filter] = wed
                  filtered.class_id = {...filtered.class_id, Wed: classId}
                  filtered.hrs = {...filtered.hrs, Wed: hr}
                  filtered.mins = {...filtered.mins, Wed: min}

                } else if (filter === 'Thurs' && thurs !== '' && check.includes(filter)) {

                  filtered[filter] = thurs
                  filtered.class_id = {...filtered.class_id, Thurs: classId}
                  filtered.hrs = {...filtered.hrs, Thurs: hr}
                  filtered.mins = {...filtered.mins, Thurs: min}

                } else if (filter === 'Fri' && fri !== '' && check.includes(filter)) {

                  filtered[filter] = fri
                  filtered.class_id = {...filtered.class_id, Fri: classId}
                  filtered.hrs = {...filtered.hrs, Fri: hr}
                  filtered.mins = {...filtered.mins, Fri: min}
                }

                // we don't need to deal with the rest of the items in a course object

              }

              // preparations for alerting App.js about conflict in the schedule
              Object.keys(filtered).filter(key => filtered[key] !== '').forEach(itemkey => {
                check.forEach(itemcheck => {
                  if (itemkey === itemcheck && filtered[itemkey] !== newclass) {
                    let con1 = filtered[itemkey].split(' ')
                    let con2 = newclass.split(' ')
                    result = [con1[1], con2[1]]
                  } else {
                    temp_details = {title: course.title, time: course.timesOffered, crn: course.crn, place: 'places'}
                  }
                })
              })


            })

            detailsToDisplay.push(temp_details)

        //  }

        } else {

          let id = {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''};
          let hour = {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''};
          let minutes = {Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''};

          if(mon !== '') {
            id.Mon = classId
            hour.Mon = hr
            minutes.Mon = min
          }

          if(tues !== '') {
            id.Tues = classId
            hour.Tues = hr
            minutes.Tues = min
          }

          if(wed !== '') {
            id.Wed = classId
            hour.Wed = hr
            minutes.Wed = min
          }

          if(thurs !== '') {
            id.Thurs = classId
            hour.Thurs = hr
            minutes.Thurs = min
          }

          if(fri !== '') {
            id.Fri = classId
            hour.Fri = hr
            minutes.Fri = min
          }
          // console.log({time: time, Mon: mon, Tues: tues, Wed: wed, Thurs: thurs, Fri: fri, class_id: id, hrs: hour, mins: minutes});

          all_courses.push({time: time, Mon: mon, Tues: tues, Wed: wed, Thurs: thurs, Fri: fri, class_id: id, hrs: hour, mins: minutes})
          prev_time.push(time.slice(0, time.indexOf(':')))
          detailsToDisplay.push({title: course.title, time: course.timesOffered, crn: course.crn, place: 'places'})
        }

      })

    })

  });

  let transit;

  slots.forEach(slot => {
    if(prev_time.includes(slot.time.slice(0, slot.time.indexOf(':')))) {
      transit = all_courses.filter(item_course => item_course.time.slice(0, item_course.time.indexOf(':')) === slot.time.slice(0, slot.time.indexOf(':'))).pop()
      transit.time = transit.time.slice(0, slot.time.indexOf(':')) + ':00' + transit.time.slice(slot.time.indexOf(' '))
      formatted.push(transit)
    } else {
      formatted.push(slot)
    }
  })

  if (result) {
    return [formatted, result, detailsToDisplay]
  } else {
    return [formatted, detailsToDisplay]
  }


}

class Home extends Component {
    constructor() {
      super ()

      this.state = {
          classes: [],
          list_schedules: {},
          button_position: false,
          show: false,
          dropDownMenu: [ 'Spring 2019', 'Fall 2019', 'Spring 2020'],
          searchedTerm: '',
          added_classes: [],
          formatted_classes: [],
          scheduleEmpty: true,
          alert: [],
          showConflict: false,
          list_schedulesDepth: [],
          schedule_deleted: '',
          schedule_conflict: ''
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
                        saved: false,
                        added: false
                      }));
                      this.setState({
                        classes: classList
                      });
                  }
              })
          }

      // adds a new schedule when button is clicked
      createNewSchedule = () => {

          let name = 'schedule_'.concat(Object.keys(this.state.list_schedules).length)
              let less = {}
              less[name] = name
              let list = {...this.state.list_schedules, ...less}


              let listDepth = this.state.list_schedulesDepth.slice()
              listDepth.push({id: name, scheduleName: name, classes: [], specFormatted: [], detail: [], empty: true})

              this.setState({ list_schedules: list})
              this.setState({ list_schedulesDepth: listDepth})

              if (Object.keys(this.state.list_schedules).length === 0) {
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
        let all_courseDetails

        //this.setState({ activeScheduleId: id[1]})

        temp_list = this.state.list_schedulesDepth.filter(depth => depth.id === id[1])[0].classes
        this.setState({ schedule_conflict: this.state.list_schedules[id[1]]})

        if (!temp_list) {
          temp_list = []
        }

        this.setState({ classes: this.state.classes.map(classname => {
            if(classname.id === id[0]){
                classname.added = !classname.added
            }

            if (classname.added === true) {

              if (!temp_list.includes(classname) && classname.id === id[0] ){
                new_class.push(classname)
              }

            } else {

              if (temp_list.includes(classname)){
                removed.push(classname)
              }

            }
            return classname;
        })})

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

        let populate = populateSchedule(temp_list)

        if (populate.length == 3) {
          let popped = populate[1]
          all_courseDetails = populate[2]
          populate = populate[0]
          this.setState({showConflict: true})
          this.setState({alert: popped})
        } else {
          all_courseDetails = populate[1]
          populate = populate[0]
        }

        //this.setState({scheduleEmpty: !temp_list.length})

        let temp_depth = this.state.list_schedulesDepth.slice()

        temp_depth.forEach(depth => {

          if (depth.id === id[1]) {
            depth.classes = temp_list
            depth.specFormatted = populate
            depth.detail = all_courseDetails
            depth.empty = !temp_depth.length
          }

          // updating schedule names
          Object.keys(this.state.list_schedules).forEach(itemSched => {
            if (depth.id === itemSched && depth.scheduleName !== this.state.list_schedules[itemSched]) {
              depth.scheduleName = this.state.list_schedules[itemSched]
            }
          })
        })

        this.setState({list_schedulesDepth: temp_depth})
        //console.log(this.state.list_schedulesDepth);
        //this.setState({formatted_classes: populate})

      }


      dropDownDisplay = (selectedClass) => {
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
        this.setState({ schedule_deleted: this.state.list_schedules[item_id] })

        let temp_keys = this.state.list_schedules

        delete temp_keys[item_id]

        this.setState({ list_schedules: temp_keys})

        this.setState(prevState => ({
          list_schedulesDepth: prevState.list_schedulesDepth.filter(depth => depth.id !== item_id)
        }));

        this.setState({ show: true });

      }

      handleScheduleName = (value, newValue) => {
          let temp_scheds =  {...this.state.list_schedules}
          temp_scheds[value] = newValue
          this.setState({ list_schedules: temp_scheds})
      }


      searchHandler = (event) => {
          this.setState({searchedTerm: event.target.value})
      }

      // <Form inline class="form-control input-lg" style={{ fontSize:'40px', position:'absolute', top:'70px', left:'1300px'}}>
      //   <FormControl id="inputlg" class="form-control input-lg" onChange={this.searchHandler} value={this.state.searchedTerm} type="text" placeholder="Search" className=" mr-sm-2" />
      // </Form>
      render() {
          const {alert, list_schedules, list_schedulesDepth, button_position, schedule_conflict, schedule_deleted, show, showConflict} = this.state;
          console.log(list_schedulesDepth)

          return (
            <div className="Landing">
                <div className="navigation">
                    <Nav className="justify-content-end" style={{color: 'black'}} activeKey="/home">
                        <div>
                            <img src={AppLogo} width='100px' height='100px' style={{position:'absolute', left:'10px', top:'20px'}}/>
                        </div>

                      <form>
                      <div class="form-group" style={{ fontSize:'40px', position:'absolute', top:'60px', left:'950px'}}>
                          <input style={{height:'55px', width:'300px'}} class="form-control input-lg" id="inputlg" type="text" placeholder="Search" onChange={this.searchHandler} value={this.state.searchedTerm}/>
                      </div>
                      </form>

                      <div>
                      {[SplitButton].map((DropdownType, idx) => (
                        <DropdownType
                          size="lg"
                          style={{position:'absolute', left: '1260px', width:'200px'}}
                          title={this.state.dropDownMenu[0]}
                          id={`dropdown-button-drop-${idx}`}
                          key={idx}
                        >
                          <Dropdown.Item onClick={this.dropDownDisplay.bind(this, this.state.dropDownMenu[1])}>{this.state.dropDownMenu[1]}</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={this.dropDownDisplay.bind(this, this.state.dropDownMenu[2])}>{this.state.dropDownMenu[2]}</Dropdown.Item>
                        </DropdownType>
                      ))}
                    </div>

                      <SignOutButton/>
                    </Nav>
                </div>

                <div className='schedule'>

                {(!button_position) && <button className='temp_button button' onClick={this.createNewSchedule}>New Schedule</button>}


                    <div>
                        {(list_schedulesDepth.length < 6 && button_position) && <button className='perm_button button' onClick={this.createNewSchedule}>New Schedule</button>}
                        {
                          list_schedulesDepth.map((item, index) => (
                            <ScheduleList id={item.id} key={item.id} classes={item.specFormatted} delete_callback={this.handleDelete.bind(this, item.id)} name={item.scheduleName} nameCallback={this.handleScheduleName.bind(this, item.id)} schId={item.id} displayDetails={item.detail} isEmpty={item.empty}/> // we can use the key to refer to the schedule clicked
                        ))
                        }
                    </div>

                  <div className="div_toast">
                      { show && <Toast id="toast" onClose={() => this.setState({ show: false })} show={show} delay={1000} autohide>
                        <Toast.Body>{schedule_deleted} deleted!</Toast.Body>
                      </Toast> }
                  </div>

                </div>

                <div className='catalog'>

                <div className="div_toastConflict">
                    { showConflict && <Toast onClose={() => this.setState({ showConflict: false })}>
                    <Toast.Header>
                      <strong className="mr-auto">Conflict Alert<br/>
                      <strong>{schedule_conflict} has a conflict!</strong>
                      </strong>
                    </Toast.Header>
                      <Toast.Body><p style={{color: 'red'}}>{alert[1]} conflicts with {alert[0]}; remove {alert[0]} to view the newly added course</p></Toast.Body>
                    </Toast> }
                </div>

                    <Tabs defaultActiveKey={this.state.activeTab} className="stickynav" id="tabs" style={{marginTop:'20px', position: 'sticky', top:'0px'}}>
                      <Tab eventKey='1' title="Catalog">
                          <ClassList classname='scrollable' classes={this.state.classes} searchedTerm={this.state.searchedTerm} selectedTerm={this.state.dropDownMenu[0]} saveClass={this.saveClass}/>
                      </Tab>

                      <Tab eventKey='2' title="Saved Classes">
                          <SavedList className='scrollable' schedules={list_schedules} classes={this.state.classes} searchedTerm={this.state.searchedTerm} selectedTerm={this.state.dropDownMenu[0]} saveClass={this.saveClass} addClass={this.addClass} lockClass={this.lockClass}/>
                      </Tab>
                      </Tabs>
                </div>
            </div>
          );
      }
  }

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
