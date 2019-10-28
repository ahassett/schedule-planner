import React, { Component } from 'react';
import ClassItem from './ClassItem';
import PropTypes from 'prop-types';

class ClassList extends Component {

    render() {
        const classOfferedThisTerm = this.props.classes.filter((classname) => {
            console.log(classname)
            if (classname.termsOffered.includes(this.props.selectedTerm)) {
                console.log('entered')
                return classname
            }
        })
        return (
            classOfferedThisTerm.map((classname) => (
                    <ClassItem key={ classname.id } classname={ classname } saveClass={this.props.saveClass}/>
        ))
    )

    }
}

// Checking PropTypes
ClassList.propTypes = {
    classes: PropTypes.array.isRequired
}

export default ClassList;
