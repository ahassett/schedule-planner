import React, { Component } from 'react';
import SavedItem from './SavedItem';
import PropTypes from 'prop-types';

class SavedList extends Component {

    render() {
        const savedClasses = this.props.classes.filter((classname) => (classname.saved === true));

        return savedClasses.map((savedClass) => (
            <SavedItem key={ savedClass.id } classname={savedClass} addClass={this.props.addClass} lockClass={this.props.lockClass}/>
        ))
            }
    }

// Checking PropTypes
SavedList.propTypes = {
    classes: PropTypes.array.isRequired
}

export default SavedList;
