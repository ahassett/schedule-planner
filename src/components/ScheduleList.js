import React, { Component } from 'react';

import './ScheduleList.css';
import star_icon from './star_icon.svg';
import email_icon from './email_icon.svg';
import delete_icon from './delete_icon.svg';


class ScheduleList extends Component {
    constructor(props) {
      super(props)

      this.state = {
          itemArray: [
            {time: '8:00', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '9:00', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '10:00', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '11:00', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '12:00', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '1:00', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '2:00', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '3:00', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '4:00', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}
          ],
      }

    }

    renderTableHeader() {
      let header = Object.keys(this.state.itemArray[0])
      header.splice(0, 1);
      header.splice(0, 0, '');
      return header.map((key, index) => {
        return <th key={index}>{key}</th>
      })
    }

    // contents of the schedule-table
    renderTableData() {
      // if (this.props.courses) {
      //   itemArray.push(this.props.courses);
      // }

      return this.state.itemArray.map((itemArray, index) => {
        const { time, Mon, Tues, Wed, Thurs, Fri } = itemArray // destructuring
        return (
          <tr key={time.slice(0, time.search(/[:]/g))}>
            <td>{time}</td>
            <td>{Mon}</td>
            <td>{Tues}</td>
            <td>{Wed}</td>
            <td>{Thurs}</td>
            <td>{Fri}</td>
          </tr>
        )
      })
    }

    render() {

      const { delete_callback } = this.props;

        return (
          <div className='all_schedules'>
            <table id='itemArray'>
              <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
              </tbody>
            </table>

            <img className='img_icon' src={email_icon} />
            <img className='img_icon' src={star_icon}/>
            <img className='img_icon' src={delete_icon} onClick={() => {delete_callback()}}/>

          </div>
        );
    }
}

export default ScheduleList;
