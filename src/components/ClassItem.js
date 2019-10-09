import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';


class ClassItem extends Component {

    // functions
    getSavedStyle = () => {
        if (this.props.classname.saved) {
            return 'saved-class'
        } else {
            return 'unsaved-class'
        }
    }

    render() {
        const { id, title, description} = this.props.classname;
        return (
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1" className={ this.getSavedStyle() } style={{overflow:'hidden'}}>
                    <p>
                    <input type='checkbox' onChange={this.props.saveClass.bind(this, id)} /> {'   '}
                    { title }
                    </p>

                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            { description }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}

// Checking PropTypes
ClassItem.propTypes = {
    classname: PropTypes.object.isRequired
}

export default ClassItem;
