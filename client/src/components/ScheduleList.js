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
          column: true,
          icon: false,
          itemArray: [
            {time: '8:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '9:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '10:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '11:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '12:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '1:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '2:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '3:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''},
            {time: '4:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: ''}
          ],
          title: props.name ? props.name.charAt(0).toUpperCase() + props.name.slice(1): '',
          class: props.classes,
          width: undefined,
          col_contents: props.isEmpty
      };

    }

    // changes state color of the star and state font of the schedule Name
    changeColor() {
       this.setState(prevState => ({
         icon: !prevState.icon,
         color: !prevState.color
       }));

    }

    handleCRNS() {
      console.log(this.props.classes);
    }

    handleChange(e) {
      this.setState({ title: e.target.value });

      let len = e.target.value.length;

      // varies length of schedule name in the schedule
      if (len < 27) {
        this.setState({ width: len * 15 })
      } else {
        this.setState({ width: 27 * 15 })
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
      let col_content

      if (this.state.col_contents) {
        col_content = "small_cols"
      } else {
        col_content = "large_cols"
      }

      return this.state.itemArray.map((itemArray, index) => {
        const { time, Mon, Tues, Wed, Thurs, Fri } = itemArray // destructuring

        return (
          <tr className={col_content} key={time.slice(0, time.search(/[:]/g))}>
            <td className={col_content}>{time}</td>
            <td className={col_content}>{Mon}</td>
            <td className={col_content}>{Tues}</td>
            <td className={col_content}>{Wed}</td>
            <td className={col_content}>{Thurs}</td>
            <td className={col_content}>{Fri}</td>
          </tr>
        )
      })
    }

    static getDerivedStateFromProps(props, state) {

      if (props.classes !== state.class) {
        return {
          itemArray: props.classes,
          col_contents: props.isEmpty

        };
      }

      return null;
    }

    render() {

      const { delete_callback } = this.props;
      const { icon, title } = this.state;
      const width_change = {
        width: this.state.width ? this.state.width + 'px' : '140px'
      }

      let header_color = this.state.color ? "beforeButton" : "afterButton";

      let icons_occupy = this.state.icon ? "icons_occupy" : "icons_allow";

      return (
        <div className='all_schedules'>
          <div className='tableName' >
            <input
              className='input_text'
              type="text"
              value={title}
              style={width_change}
              onChange={this.handleChange.bind(this)}
            />

            { !icon && <img className={'img_icon'} src={delete_icon} onClick={() => {delete_callback()}}/> }
            { icon && <img className={'img_icon'} src={star} onClick={this.changeColor.bind(this)}/> }
            { !icon && <img className={'img_icon'} src={star_icon} onClick={this.changeColor.bind(this)}/> }
            <a href="mailto:angulumbi@middlebury.edu?subject = Your Schedule&body=courses">
              <img className={'img_icon'} src={email_icon} />
            </a>

            { !this.state.col_contents && <input
              className='input_CRNS'
              type="text"
              value="CRN's"
              onClick={this.handleCRNS}
            /> }

          </div>
          <table id='itemArray'>
            <tbody>
              <tr className={header_color} >{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>

        </div>
      );
    }
}

export default ScheduleList;
