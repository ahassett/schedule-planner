import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddButton from './add-button.png';
import DeleteButton from './delete-button.png';
import LockedButton from './locked.png';
import UnlockedButton from './unlocked.png';

class SavedItem extends Component {

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
    getLockedSrc = () => {
        if (this.props.classname.locked) {
            return LockedButton
        } else {
            return UnlockedButton
        }
    }

    render() {
        const { id } = this.props.classname;
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
                        <img src={this.getLockedSrc()} onClick={this.props.lockClass.bind(this, id)} width='30px' height='30px' style={{position:'absolute', left:'635px', top:'10px'}}/>
                        <img src={this.getAddedSrc()} onClick={this.props.addClass.bind(this, id)} className={ this.getAddedStyle() } width='30px' height='30px' style ={{position:'absolute', left:'670px', top:'10px'}}/>
                        </Accordion.Toggle>
                    </Card>
                </Accordion>
            )
        }

    }


export default SavedItem;
