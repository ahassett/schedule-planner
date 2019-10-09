import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';


class ClassList extends Component {

    render() {
        console.log(this.props.classes);
        return this.props.classes.map((classname) => (
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        { classname.title }
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            { classname.description }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        ));
    }
}

export default ClassList;
