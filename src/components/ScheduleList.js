import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class ScheduleList extends Component {

    state = {
        itemArray: []
    }

    createNewSchedule = () => {
        console.log(this)
    }

    render() {
        return (
            <div>
                <Button variant='primary' className='new-schedule-button' onClick={this.createNewSchedule}>New Schedule</Button>
            </div>
        );
    }
}

export default ScheduleList;
