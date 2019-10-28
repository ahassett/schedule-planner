import React, { Component } from 'react';

import './ScheduleList.css';
import star_icon from './star_icon.svg';
import star from './star.svg';
import email_icon from './email_icon.svg';
import delete_icon from './delete_icon.svg';


class ScheduleList extends Component {
    constructor(props) {
      super(props)

      this.state = {
          color: true,
          icon: false,
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
      };

    }

    // changes state color of the star and state font of the schedule Name
    changeColor() {

       this.setState(prevState => ({
         icon: !prevState.icon,
         color: !prevState.color
       }));

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

      const { delete_callback, name } = this.props;
      const { icon } = this.state;

      let header_color = this.state.color ? "beforeButton" : "afterButton";

      let icons_occupy = this.state.icon ? "icons_occupy" : "icons_allow";

      //let src_icon = this.state.icon ? "star" : "star_icon";


        return (
          <div className='all_schedules'>
          <div className='tableName' >{name.charAt(0).toUpperCase() + name.slice(1)}</div>
            <table id='itemArray'>
              <tbody>
                <tr className={header_color} >{this.renderTableHeader()}</tr>
                {this.renderTableData()}
              </tbody>
            </table>

            <a href="mailto:angulumbi@middlebury.edu?subject = Your Schedule&body= courses">
              <img className={icons_occupy} src={email_icon} />
            </a>
            { !icon && <img className={icons_occupy} src={star_icon} onClick={this.changeColor.bind(this)}/> }
            { icon && <img className={icons_occupy} src={star} onClick={this.changeColor.bind(this)}/> }
            { !icon && <img className={icons_occupy} src={delete_icon} onClick={() => {delete_callback()}}/> }

          </div>
        );
    }
}

export default ScheduleList;
