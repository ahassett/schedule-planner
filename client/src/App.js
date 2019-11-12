import React, { Component } from 'react';
import ClassList from './components/ClassList';
import ScheduleList from './components/ScheduleList';
import SavedList from './components/SavedList';

import { Tab, Tabs, TabContent, Toast,  Dropdown, Form, Button, FormControl } from 'react-bootstrap';

import uuid from 'uuid';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function formatit(courses) {
  let all_courses = [];

  // the time slots that originally show on the schedule
  let slots = [
    {time: '8:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
    {time: '9:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
    {time: '10:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
    {time: '11:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
    {time: '12:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
    {time: '1:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
    {time: '2:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
    {time: '3:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
    {time: '4:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}
  ];

  // the one item in this list is important for starting the for each loop below
  // but id has no significance
  let prev_time = [0];

  // for each of the added courses, run this loop
  console.log('courses',courses);
  courses.forEach(term => {
    let str_term = term.timesOffered; // only get the time
    console.log('str_term', str_term);

    let dash_loc;
    let strArr = []; // array for different times in case a class is offered at different times in a week

    // populate strArr
    while(str_term.includes('-')) {
      dash_loc = str_term.indexOf('-');
      strArr.push(str_term.substring(0, dash_loc + 10));
      str_term = str_term.substring(dash_loc + 10);


            // if (!str_term) {
            //   break
            // }
            // console.log('while', !str_term);
            //
    }

    // for each of the item in array, create and populate the object
    strArr.forEach(str => {

      dash_loc = str.indexOf('-');

      // obtain times with no meridians and spaces
      let time_str = str.substring(dash_loc - 9, dash_loc + 10).replace(/ pm/gi, '');
      time_str = time_str.replace(/ am/gi, '');
      time_str = time_str.replace(/ /gi, '');

      // create a list, so as to loop over days and time
      str = str.substring(0, dash_loc - 4) + str.substring(dash_loc + 10);
      str = str.split(' ');

      let end, mon = '', tues = '', wed = '', thurs = '', fri = '', time= '', day = '';

      // loop over days and time in str array
      str.forEach(item => {

        if (!parseInt(item.slice(0, 1))) {
          if (item.slice(0, 1) == "T") {
            end = 4
          } else {
            end = 3
          }

          day = item.slice(0, end);
          end = term.title.indexOf('-');

          let new_title = time_str + ' ' + term.title.slice(0, end).replace(' ', '');

          if (day.localeCompare('Mon') === 0) {
            mon = new_title
          } else if (day.localeCompare('Tues') === 0) {
            tues = new_title
          } else if (day.localeCompare('Wed') === 0) {
            wed = new_title
          } else if (day.localeCompare('Thur') === 0) {
            thurs = new_title
          } else {
            fri = new_title
          }
        } else {

          if (parseInt(item.slice(0, item.search(/[:]/g))) > 4) {

            time = item + ' am';
            console.log(time);

          } else {
            time = item + ' pm';
          }
        }

      });

      prev_time.forEach(i => {
        if (!prev_time.includes(time)) {
          all_courses.push({time: time, Mon: mon, Tues: tues, Wed: wed, Thurs: thurs, Fri: fri});
          console.log(time);
          prev_time.push(time);
        }
      });

    })

  });

  let formatted_slots = [];

  // create an entire schedule slot so that we can pass all slots as props
  // then render for every prop change
  slots.map(slot => {
    if (prev_time.includes(slot.time)){
      formatted_slots.push(all_courses.find(element => (element.time.localeCompare(slot.time) === 0)))
    } else {
      formatted_slots.push(slot)
    }

  });

  return formatted_slots;
}


class App extends Component {
  constructor() {
    super ()

    this.state = {
        classes: [
          {
              id: uuid(),
              title: 'CSCI 0101 - Introduction to Computing',
              description: 'In this course we will provide a broad introductory overview of the discipline of computer science, with no prerequisites or assumed prior knowledge of computers or programming. A significant component of thecourse is an introduction to algorithmic concepts and to programming using Python; programming assignments will explore algorithmic strategies such as selection, iteration, divide-and-conquer, and recursion, as well as introducing the Python programming language. Additional topics will include: the structure and organization of computers, the Internet and World Wide Web, abstraction as a means of managing complexity, social and ethical computing issues, and the question "What is computation?" (Juniors and Seniors by waiver) 3 hr. lect./1 hr. lab DED',
              termsOffered: 'Fall 2015, Spring 2016, Fall 2016, Spring 2017, Fall 2017, Spring 2018, Fall 2018, Spring 2019, Fall 2019, Spring 2020',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'CSCI 0150 - Computing for the Sciences',
              description: 'In this course we will provide a broad introductory overview of the discipline of computer science, with no prerequisites or assumed prior knowledge of computers or programming. A significant component of thecourse is an introduction to algorithmic concepts and to programming using Python; programming assignments will explore algorithmic strategies such as selection, iteration, divide-and-conquer, and recursion, as well as introducing the Python programming language. Additional topics will include: the structure and organization of computers, the Internet and World Wide Web, abstraction as a means of managing complexity, social and ethical computing issues, and the question "What is computation?" (Juniors and Seniors by waiver) 3 hr. lect./1 hr. lab DED',
              termsOffered: 'Fall 2015, Spring 2016, Fall 2016, Spring 2017, Fall 2017, Spring 2018, Fall 2018, Spring 2019, Fall 2019, Spring 2020',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'CSCI 0200 - Math Foundations of Computing',
              description: 'In this course we will provide an introduction to the mathematical foundations of computer science, with an emphasis on formal reasoning. Topics will include propositional and predicate logic, sets, functions, and relations; basic number theory; mathematical induction and other proof methods; combinatorics, probability, and recurrence relations; graph theory; and models of computation. (One CSCI course at the 0100-level) (Juniors and Seniors by waiver) 3 hrs. lect./lab DED',
              termsOffered: 'Fall 2015, Spring 2016, Fall 2016, Spring 2017, Fall 2017, Spring 2018, Fall 2018, Spring 2019, Fall 2019, Spring 2020',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'CSCI 0201 - Data Structures',
              description: 'In this course we will study the ideas and structures helpful in designing algorithms and writing programs for solving large, complex problems. The Java programming language and object-oriented paradigm are introduced in the context of important abstract data types (ADTs) such as stacks, queues, trees, and graphs. We will study efficient implementations of these ADTs, and learn classic algorithms to manipulate these structures for tasks such as sorting and searching. Prior programming experience is expected, but prior familiarity with the Java programming language is not assumed. (One CSCI course at the 0100-level) (Juniors and Seniors by waiver) 3 hrs. lect./lab DED',
              termsOffered: 'Fall 2015, Spring 2016, Fall 2016, Spring 2017, Fall 2017, Spring 2018, Fall 2018, Spring 2019, Fall 2019, Spring 2020',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm Friday 11:00 am - 12:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'CSCI 0202 - Computer Architecture ',
              description: 'In this course we will provide an introduction to the mathematical foundations of computer science, with an emphasis on formal reasoning. Topics will include propositional and predicate logic, sets, functions, and relations; basic number theory; mathematical induction and other proof methods; combinatorics, probability, and recurrence relations; graph theory; and models of computation. (One CSCI course at the 0100-level) (Juniors and Seniors by waiver) 3 hrs. lect./lab DED',
              termsOffered: 'Fall 2015, Spring 2016, Fall 2016, Spring 2017, Fall 2017, Spring 2018, Fall 2018, Spring 2019, Fall 2019, Spring 2020',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'CSCI 0301 - Theory of Computation ',
              description: 'This course explores the nature of computation and what it means to compute. We study important models of computation (finite automata, push-down automata, and Turing machines) and investigate their fundamental computational power. We examine various problems and try to determine the computational power needed to solve them. Topics include deterministic versus non-deterministic computation, and a theoretical basis for the study of NP-completeness. (CSCI 0200 and CSCI 0201) 3 hrs. lect./disc. DED',
              termsOffered: 'Fall 2015, Fall 2016, Fall 2017, Spring 2018, Fall 2018, Spring 2019, Fall 2019, Spring 2020',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'CSCI 0302 - Algorithms and Complexity',
              description: 'This course focuses on the development of correct and efficient algorithmic solutions to computational problems, and on the underlying data structures to support these algorithms. Topics include computational complexity, analysis of algorithms, proof of algorithm correctness, advanced data structures such as balanced search trees, and also important algorithmic techniques including greedy and dynamic programming. The course complements the treatment of NP-completeness in CSCI 0301. (CSCI 0200 and CSCI 0201) 3 hrs. lect./disc. DED',
              termsOffered: 'Spring 2016, Fall 2016, Spring 2017, Fall 2017, Spring 2018, Fall 2018, Spring 2019, Fall 2019, Spring 2020',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'CSCI 0311 - Artificial Intelligence',
              description: 'Artificial Intelligence (AI) is the study of computational systems that exhibit rational behavior. Applications include strategic game playing, medical diagnosis, speech and handwriting recognition, Internet search, and robotics. Course topics include intelligent agent architectures, search, knowledge representation, logical reasoning, planning, reasoning under uncertainty, machine learning, and perception and action. (CSCI 0200 and CSCI 0201) 3 hrs. lect./lab DED',
              termsOffered: 'Spring 2020',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'CSCI 0312 - Software Development',
              description: 'This course examines the process of developing larger-scale software systems. Laboratory assignments emphasize sound programming practices, tools that facilitate the development process, and teamwork. (CSCI 0200 and CSCI 0201) 3 hrs. lect./lab',
              termsOffered: 'Fall 2015, Spring 2017, Spring 2018, Spring 2019, Fall 2019, Spring 2020',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'CSCI 0314 - Operating Systems',
              description: 'An operating system manages the complex resources of modern computers and provides an interface between the user and the hardware. This course covers the key concepts of operating systems, including process, memory, and storage management; synchronization and deadlock; protection and security; and distributed systems. (CSCI 0200 previously or concurrently, and CSCI 0202) 3 hrs. lect./lab DED',
              termsOffered: 'Spring 2020',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'CSCI 0315 - Systems Programming',
              description: 'Students will become intimately acquainted with the low-level software services that applications often take for granted. Through a broad, project-based survey of core system libraries and UNIX system calls, students will explore process management, memory management, linking and loading, threading, synchronization, filesystem operations, and inter-process communication (networking). In each area, students will build software using these building blocks, gaining an understanding of the behavior and efficiency of the tools at their disposal. Students will also gain experience building larger, more complex systems upon which applications can be built. This course is ideal for students who wish to understand and construct the software infrastructure upon which user-level software depends. (CSCI 0202) 3 hrs. lect DED',
              termsOffered: 'Fall 2017, Fall 2018, Fall 2019',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
              id: uuid(),
              title: 'CSCI 0321 - Bioinformatics Algorithms',
              description: 'In this course we will explore and implement algorithmic solutions to modern biology questions. Students will be introduced to motivating biological questions—such as, “How do we compare DNA sequences?”—and then implement solutions to those problems using dynamic programming, graph, randomized, combinatorial and/or other algorithmic approaches. At the completion of the course students will be able to precisely define computational biology problems, design an algorithmic solution and implement that solution in software. No biology background is assumed, but students are expected to be able to implement sophisticated algorithms in Python or another language of their choice. (CSCI 201) 3 hrs. lect./lab. DED',
              termsOffered: 'Spring 2017, Spring 2019',
              timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
              saved: false,
              added: false,
              locked: false
          },
          {
            id: uuid(),
            title: 'CSCI 0701 - Senior Seminar',
            description: 'This senior seminar provides a capstone experience for computer science majors at Middlebury College. Through lectures, readings, and a series of two to three week individual and group assignments, we will introduce important concepts in research and experimental methods in computation. Examples will include: reading research papers; identifying research problems; dealing with big data; experimental design, testing and analysis; and technical writing in computer science. (Approval only).',
            termsOffered: 'Fall 2015, Spring 2016, Fall 2016, Spring 2017, Fall 2017, Spring 2018, Fall 2018, Spring 2019, Fall 2019, Spring 2020',
            timesOffered: 'Monday, Wednesday, Friday 9:00 am - 10:00 am',
            saved: false,
            added: false,
            locked: false
        },
        {
            id: uuid(),
            title: 'CSCI 0702 - Senior Thesis ',
            description: 'The senior thesis is required for all CSCI majors who wish to be considered for high and highest departmental honors, and is recommended for students interested in pursuing graduate study in computer science. Students will spend the semester researching and writing, and developing and experimenting as appropriate for their topic. All students will be expected to report on their work in the form of a written thesis, a poster, and an oral presentation at the end of the semester. In addition, throughout the semester, students will meet as a group to discuss research and writing, and will be expected to attend talks in the Computer Science lecture series. Before approval to join the class is granted, students are expected to have chosen a thesis adviser from the CSCI faculty, and determined a thesis topic with the guidance and approval of that adviser. (CSCI 0701 and approval required) 3 hrs. lect./disc.',
            termsOffered: 'Fall 2015, Spring 2016, Fall 2016, Spring 2017, Fall 2017, Spring 2018, Fall 2018, Spring 2019, Fall 2019, Spring 2020',
            timesOffered: 'Tuesday, Thursday 2:00 pm - 4:00 pm',
            saved: false,
            added: false,
            locked: false
        }
        ],
        list_schedules: [],
        button_position: false,
        show: false,
        dropDownMenu: [ 'Spring 2019', 'Fall 2019', 'Spring 2020'],
        searchedTerm: '',
        added_classes: [],
        formatted: {},
        bool_run: false,
        times: {time: '', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}
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
        let temp_list = []; // array of classes to be displayed on schedule
        let removed = [];  // array of removed classes
        let new_class = '0';  // variable for the newest class added

        this.setState({ classes: this.state.classes.map(classname => {
            if(classname.id === id){
                classname.added = !classname.added;
                this.setState({bool_run: true})
            }

            // store the new class
            // if statement important to keep track of removed classes
            if (classname.added === true) {

              if (!this.state.added_classes.includes(classname)) {
                new_class = classname;
              }

            } else {
              // store removed item
              if (this.state.added_classes.includes(classname)) {
                removed.push(classname)
              }
            }

            return classname;
        })})

        this.state.added_classes.forEach(remove => {
          if (!removed.includes(remove)) {
            temp_list.push(remove);
          }
        })

        if (new_class != '0') {
          temp_list.push(new_class);
        }

        this.setState({added_classes: temp_list});
        this.setState({formatted: formatit(temp_list)})

    }

    lockClass = (id) => {
        this.setState({ classes: this.state.classes.map(classname => {
            if(classname.id === id){
                classname.locked = !classname.locked
            }
            return classname;
        })})
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
      this.setState(prevState => ({
        list_schedules: prevState.list_schedules.filter(item => item != item_id )
      }));

      this.setState({ show: true });

    }
    searchHandler = (event) => {
        this.setState({searchedTerm: event.target.value})
    }

    render() {

        const {list_schedules, button_position, bool_run, show} = this.state;

        return (
          <div className="App">

              <h1>Course Catalog and Schedule</h1>

              <div className='schedule'>

              {(!button_position) && <button className='temp_button button' onClick={this.createNewSchedule}>New Schedule</button>}

              {button_position && <button className='perm_button button' onClick={this.createNewSchedule}>New Schedule</button>}
              {
                list_schedules.map((item, index) => (
                  <ScheduleList id={item} key={item} classes={this.state.formatted} delete_callback={this.handleDelete.bind(this, item)} name={item}/> // we can use the key to refer to the schedule clicked
              ))
              }


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

                  <Tabs className="sticky" defaultActiveKey={this.state.activeTab} id="tabs" style={{'marginTop':'20px'}}>
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

export default App;
