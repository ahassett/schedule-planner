import React, { Component } from 'react';
import ClassItem from './ClassItem';
import PropTypes from 'prop-types';

function searchingFor(term) {
        return function(x){
            if (term === ''){
                return true;
            } else {
            return x.title.toLowerCase().includes(term.toLowerCase() || !term);
            }
        }

}

class ClassList extends Component {

    render() {
        const { searchedTerm, classes, selectedTerm, saveClass } = this.props;
        const classOfferedThisTerm = classes.filter((classname) => {
            if (classname.termsOffered.includes(selectedTerm)) {
                return classname
            }
        })
        return (
            classOfferedThisTerm.filter(searchingFor(searchedTerm)).map((classname) => (
                    <ClassItem key={classname.id} classname={classname} saveClass={saveClass}/>
        ))
    )

    }
}

// Checking PropTypes
ClassList.propTypes = {
    classes: PropTypes.array.isRequired
}

export default ClassList;
