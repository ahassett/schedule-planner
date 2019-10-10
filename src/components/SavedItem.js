import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

class SavedItem extends Component {

    render() {
            console.log(this.props.classname)
            return (
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1" style={{overflow:'hidden'}}>
                        <p>
                        { this.props.classname.title }
                        </p>

                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                { this.props.classname.description }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            )
        }

    }


export default SavedItem;
