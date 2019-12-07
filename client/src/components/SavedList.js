import React, { Component } from 'react';
import SavedItem from './SavedItem';
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

class SavedList extends Component {

    render() {
        const { classes, searchedTerm, saveClass, selectedTerm, lockClass, addClass, schedules} = this.props;
        const savedClasses = classes.filter((classname) => (classname.saved === true) && classname.termsOffered.includes(selectedTerm));
        return savedClasses.filter(searchingFor(searchedTerm)).map((savedClass) => (
            <SavedItem key={ savedClass.id } classname={savedClass} saveClass={saveClass} addClass={addClass} lockClass={lockClass} schedules={schedules}/>
        ));
            }
    }

// Checking PropTypes
SavedList.propTypes = {
    classes: PropTypes.array.isRequired
}

export default SavedList;
