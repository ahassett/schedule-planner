import React, { Component } from 'react';
import ClassItem from './ClassItem';
import PropTypes from 'prop-types';



class ClassList extends Component {

    render() {
        console.log(this.props.classes);
        return this.props.classes.map((classname) => (
            <ClassItem key={ classname.id } classname={ classname } saveClass={this.props.saveClass}/>
        ));
    }
}

// Checking PropTypes
ClassList.propTypes = {
    classes: PropTypes.array.isRequired
}

export default ClassList;
