import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddButton from './add-button.png';
import DeleteButton from './delete-button.png';
import LockedButton from './locked.png';
import UnlockedButton from './unlocked.png';
import { Dropdown } from 'react-bootstrap';

import Add0 from './add0.png';
import Add1 from './add1.png';
import Add2 from './add2.png';
import Add3 from './add3.png';
import Add4 from './add4.png';
import Add5 from './add5.png';

import Del0 from './del0.png';
import Del1 from './del1.png';
import Del2 from './del2.png';
import Del3 from './del3.png';
import Del4 from './del4.png';
import Del5 from './del5.png';


class SavedItem extends Component {
  constructor() {
    super ()

    this.state ={
      displayValue: 'none',
      postoggledImages: {schedule_0: false, schedule_1: false, schedule_2: false, schedule_3: false, schedule_4: false, schedule_5: false},
      addImages: {schedule_0: Add0, schedule_1: Add1, schedule_2: Add2, schedule_3: Add3, schedule_4: Add4, schedule_5: Add5},
      delImages: {schedule_0: Del0, schedule_1: Del1, schedule_2: Del2, schedule_3: Del3, schedule_4: Del4, schedule_5: Del5}
    }
  }
    //
    // getAddedStyle = () => {
    //     if (this.props.classname.added) {
    //         return 'notadded-class'
    //     } else {
    //         return 'added-class'
    //     }
    // }

    getAddedSrc = (key) => {
      let addImages = {schedule_0: Add0, schedule_1: Add1, schedule_2: Add2, schedule_3: Add3, schedule_4: Add4, schedule_5: Add5}
      let delImages = {schedule_0: Del0, schedule_1: Del1, schedule_2: Del2, schedule_3: Del3, schedule_4: Del4, schedule_5: Del5}
      //let postoggledImages = {schedule_0: true, schedule_1: true, schedule_2: true, schedule_3: true, schedule_4: true, schedule_5: true}

        if (this.props.schedules) {
           if (!this.state.postoggledImages[key]) {
              //this.setState({postoggledImages: false})
              return addImages[key]
            } else
              //this.setState({postoggledImages: true})
              return delImages[key]
            }
        }


    // getAddedSrc = (key) => {
    //     if (this.props.schedules) {
    //        if (!this.props.classname.added) {
    //           if (this.props.schedules.length === 1) {
    //             return Add0
    //           }
    //           if (this.props.schedules.length === 2) {
    //             return Add1
    //           }
    //           if (this.props.schedules.length === 3) {
    //             return Add2
    //           }
    //           if (this.props.schedules.length === 4) {
    //             return Add3
    //           }
    //           if (this.props.schedules.length === 5) {
    //             return Add4
    //           }
    //           if (this.props.schedules.length === 6) {
    //             return Add5
    //           }
    //         } else {
    //           if (this.props.schedules.length === 1) {
    //             return Del0
    //           }
    //           if (this.props.schedules.length === 2) {
    //             return Del1
    //           }
    //           if (this.props.schedules.length === 3) {
    //             return Del2
    //           }
    //           if (this.props.schedules.length === 4) {
    //             return Del3
    //           }
    //           if (this.props.schedules.length === 5) {
    //             return Del4
    //           }
    //           if (this.props.schedules.length === 6) {
    //             return Del5
    //           }
    //         }
    //     }
    // }
    //
    // // getAddedSrc = (key) => {
    // //     if (this.props.schedules) {
    // //        if (!this.props.classname.added) {
    // //           if (Object.keys(this.props.schedules).length === 1) {
    // //             return Add0
    // //           }
    // //           if (Object.keys(this.props.schedules).length === 2) {
    // //             return Add1
    // //           }
    // //           if (Object.keys(this.props.schedules).length === 3) {
    // //             return Add2
    // //           }
    // //           if (Object.keys(this.props.schedules).length === 4) {
    // //             return Add3
    // //           }
    // //           if (Object.keys(this.props.schedules).length === 5) {
    // //             return Add4
    // //           }
    // //           if (Object.keys(this.props.schedules).length === 6) {
    // //             return Add5
    // //           }
    // //         } else {
    // //           if (Object.keys(this.props.schedules).length === 1) {
    // //             return Del0
    // //           }
    // //           if (Object.keys(this.props.schedules).length === 2) {
    // //             return Del1
    // //           }
    // //           if (Object.keys(this.props.schedules).length === 3) {
    // //             return Del2
    // //           }
    // //           if (Object.keys(this.props.schedules).length === 4) {
    // //             return Del3
    // //           }
    // //           if (Object.keys(this.props.schedules).length === 5) {
    // //             return Del4
    // //           }
    // //           if (Object.keys(this.props.schedules).length === 6) {
    // //             return Del5
    // //           }
    // //         }
    // //     }
    // // }
    //
    //
    // // getAddedSrc = () => {
    // //     if (this.props.classname.added) {
    // //         return DeleteButton
    // //     } else {
    // //         return AddButton
    // //     }
    // // }
    //
    // // getAddedSrc = () => {
    // //     if (this.props.classname.added) {
    // //       console.log(this.props.classname.added);
    // //         return 'Del'
    // //     } else {
    // //       console.log(this.props.classname.added);
    // //         return 'Add'
    // //     }
    // //}

    getLockedSrc = () => {
        if (this.props.classname.locked) {
            return LockedButton
        } else {
            return UnlockedButton
        }
    }

    // handleAdd = (scheduleAdd) => {
    //   if (this.props.schedules) {
    //     if (Object.keys(this.props.schedules).length > 1){
    //       this.setState({displayValue: 'block'})
    //     }
    //
    //     if (Object.keys(this.props.schedules).length === 1){
    //       console.log([this.props.classname.id, Object.keys(this.props.schedules)[0]]);
    //       this.props.addClass([this.props.classname.id, Object.keys(this.props.schedules)[0]])
    //     }
    //   }
    // }

    handleAdd = (scheduleAdd) => {
      console.log('pro', this.props.classname.added)

      this.props.addClass([this.props.classname.id, scheduleAdd])
      console.log('props', this.props.classname.added)
      console.log(scheduleAdd);
      let temp_bool = {...this.state.postoggledImages}

      Object.keys(temp_bool).forEach(bool => {
        if (bool === scheduleAdd) {
          temp_bool[bool] = this.props.classname.added
        }
      })
      console.log('prop', this.props.classname.added, 'bool', temp_bool);
      this.setState({ postoggledImages: temp_bool})
    }

    // handleDropdownItem = (name) => {
    //   this.setState({displayValue: 'none'})
    //   this.props.addClass([this.props.classname.id, name])
    //   console.log('id', [this.props.classname.id, name]);
    // }

    render() {
        const { id } = this.props.classname;
        const { displayValue } = this.state;
        const { schedules } = this.props;
        let all_contents = [], allcreat;

        console.log('g',schedules);

        // if (schedules) {
        //   if (Object.keys(schedules).length > 1){
        //     Object.keys(schedules).forEach((sch, index) => {
        //       console.log('sch', sch);
        //       all_contents.push(<a href="#" key={index} onClick={this.handleDropdownItem.bind(this, sch)}>{schedules[sch]}</a>)
        //     })
        //   }
        //   console.log('ho');
        // }

        console.log(schedules);

        // <Dropdown className="sticky" style={{position:'absolute', top:'10px', right:'15px'}}>
        //   <Dropdown.Toggle variant="success" id="dropdown-basic">
        //     {this.getAddedSrc()}
        //   </Dropdown.Toggle>
        //
        //   <Dropdown.Menu style={{zIndex:1}}>
        //     <Dropdown.Item onClick={this.handleDropdownItem()}>shc</Dropdown.Item>
        //     <Dropdown.Item onClick={this.handleDropdownItem()}>shc</Dropdown.Item>
        //   </Dropdown.Menu>
        // </Dropdown>

        // <div className="dropdown" style ={{position:'absolute', left:'670px', top:'10px', zIindex: '1'}}>
        //   <img src={this.getAddedSrc()} onClick={this.handleAdd} className={ this.getAddedStyle() } className="dropIcon" width='30px' height='30px'/>
        //   <div id="myDropdown" className="dropdown-content"  style={{display: displayValue}}>
        //     <a href="#" onClick={() => this.setState({displayValue: 'none'})}>sch</a>
        //   </div>
        // </div>

        //<img src={this.getLockedSrc()} onClick={this.props.lockClass.bind(this, id)} className="dropIcon" width='30px' height='30px' style={{position:'absolute', left:'605px', top:'10px'}}/>

        // <div key= {sch} className="dropdown" id="trial" style ={{position:'absolute', left:'570px', top:'10px', zIindex: '1', width: '10px'}}>
        //   <img key= {sch} src={this.getAddedSrc()} onClick={this.handleAdd} className={ this.getAddedStyle() } className="dropIcon" width='30px' height='30px'/>
        //   <div id="myDropdown" className="dropdowncontent"  style={{display: displayValue, height: 100, overflowY: 'scroll'}}>
        //     {all_contents}
        //   </div>
        // </div>

        //key={sch.slice(sch.indexOf('_')+1)}

        // { Object.keys(schedules).map(sch => (
        //   <div key={sch} className="dropdown" id="trial" style ={{position:'absolute', left:'570px', top:'10px', zIindex: '1', width: '10px'}}>
        //     <img key={sch} src={this.getAddedSrc()} onClick={this.handleAdd} className={ this.getAddedStyle() } className="dropIcon" width='30px' height='30px'/>
        //   </div>
        // )) }


        return (
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1" style={{overflow:'hidden'}}>
                        <Form.Check
                          onChange={this.props.saveClass.bind(this, id)}
                          custom
                          type='checkbox'
                          checked={this.props.classname.saved}
                          id={this.props.classname.id}
                          label={ this.props.classname.title }
                        />

                       { Object.keys(schedules).map((sch, index) => (
                         <div key={sch} className="dropdown" id="trial" style ={{position:'absolute', left:`${660 - (index * 30)}` + 'px', top:'10px', zIindex: '1', width: '10px'}}>
                           <img key={sch} src={this.getAddedSrc(sch)} onClick={this.handleAdd.bind(this, sch)} width='30px' height='30px'/>
                         </div>
                       )) }


                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
      }

    }


export default SavedItem;
