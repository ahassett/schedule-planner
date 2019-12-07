import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddButton from './add-button.png';
import DeleteButton from './delete-button.png';
import LockedButton from './locked.png';
import UnlockedButton from './unlocked.png';
import { Dropdown, ListGroup } from 'react-bootstrap';

class SavedItem extends Component {
  constructor() {
    super ()

    this.state ={
      displayValue: 'none'
    }
  }

    getAddedStyle = () => {
        if (this.props.classname.added) {
            return 'notadded-class'
        } else {
            return 'added-class'
        }
    }

    getAddedSrc = () => {
        if (this.props.classname.added) {
            return DeleteButton
        } else {
            return AddButton
        }
    }

    // getAddedSrc = () => {
    //     if (this.props.classname.added) {
    //       console.log(this.props.classname.added);
    //         return 'Del'
    //     } else {
    //       console.log(this.props.classname.added);
    //         return 'Add'
    //     }
    //}

    getLockedSrc = () => {
        if (this.props.classname.locked) {
            return LockedButton
        } else {
            return UnlockedButton
        }
    }

    handleAdd = () => {
      if (this.props.schedules) {
        if (Object.keys(this.props.schedules).length > 1){
          this.setState({displayValue: 'block'})
        }

        if (Object.keys(this.props.schedules).length === 1){
          console.log([this.props.classname.id, Object.keys(this.props.schedules)[0]]);
          this.props.addClass([this.props.classname.id, Object.keys(this.props.schedules)[0]])
        }
      }
    }

    handleDropdownItem = (name) => {
      this.setState({displayValue: 'none'})
      this.props.addClass([this.props.classname.id, name])
      console.log('id', [this.props.classname.id, name]);
    }

    handleDivs = () => {
        console.log(this.props.classname.comments)
                return (
                    <ListGroup.Item>
                        {this.props.classname.comments.map((item) => (
                            <ListGroup.Item>{item}</ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                )

    }

    render() {
        const { id, comments } = this.props.classname;
        const { displayValue } = this.state;
        let all_contents = [];

        console.log(this.props.classname)

        if (this.props.schedules) {
          if (Object.keys(this.props.schedules).length > 1){
            Object.keys(this.props.schedules).forEach((sch, index) => {
              console.log('sch', sch);
              all_contents.push(<a href="#" key={index} onClick={this.handleDropdownItem.bind(this, sch)}>{this.props.schedules[sch]}</a>)
            })
          }
        }

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
                    <div className="dropdown" id="trial" style ={{position:'absolute', left:'570px', top:'10px', zIindex: '1', width: '10px'}}>
                      <img src={this.getAddedSrc()} onClick={this.handleAdd} className={ this.getAddedStyle() } className="dropIcon" width='30px' height='30px'/>
                      <div id="myDropdown" className="dropdowncontent"  style={{display: displayValue, height: 100, overflowY: 'scroll'}}>
                        {all_contents}
                      </div>
                    </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <ListGroup variant="flush">
                                {this.handleDivs()}
                          </ListGroup>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
      }

    }


export default SavedItem;
