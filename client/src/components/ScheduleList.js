import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

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
          col_contents: props.isEmpty,
          show: false
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
      this.setState({show: true})
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
      header.splice(6, 1);
      header.splice(6, 1);
      console.log(header);
      return header.map((key, index) => {
        return <th key={index}>{key}</th>
      })
    }

    // contents of the schedule-table
    renderTableData() {
      let col_content, rand
      let col_array = ['#ffc0cb', '#ffa500', '#00ffff', '#b300b3', '#228B22']

      if (this.state.col_contents) {
        col_content = "small_cols"
      } else {
        col_content = "large_cols"
      }

      return this.state.itemArray.map((itemArray, index) => {
        const { time, Mon, Tues, Wed, Thurs, Fri, class_id } = itemArray // destructuring

        let mon_color = '#ffffff', tues_color = '#ffffff', wed_color = '#ffffff', thurs_color = '#ffffff', fri_color = '#ffffff'

        // use to fin color for each class
        rand = Math.floor(Math.random() * 5)

        if (Mon !== '') {
          mon_color = col_array[class_id]
        }

        if (Tues !== '') {
          tues_color = col_array[class_id]
        }

        if (Wed !== '') {
          wed_color = col_array[class_id]
        }

        if (Thurs !== '') {
          thurs_color = col_array[class_id]
        }

        if (Fri !== '') {
          fri_color = col_array[class_id]
        }

        return (
          <tr className={col_content} key={time.slice(0, time.search(/[:]/g))}>
            <td className={col_content}>{time}</td>
            <td style={{background: mon_color}} className={col_content}>{Mon}</td>
            <td style={{background: tues_color}} className={col_content}>{Tues}</td>
            <td style={{background: wed_color}} className={col_content}>{Wed}</td>
            <td style={{background: thurs_color}} className={col_content}>{Thurs}</td>
            <td style={{background: fri_color}} className={col_content}>{Fri}</td>
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
      const { icon, title, show } = this.state;
      const width_change = {
        width: this.state.width ? this.state.width + 'px' : '140px'
      }

      let header_color = this.state.color ? "beforeButton" : "afterButton";

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
                type="button"
                value="CRN's"
                onClick={() => this.setState({show: true})}
              />
            }

          </div>
          <table id='itemArray'>
            <tbody>
              <tr className={header_color} >{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>

          <div id={'crn_toast'}>
            { show &&
              <Toast
                onClose={() => this.setState({ show: false })}
                show={show}>

                  <Toast.Header>
                    <strong className="mr-auto">Get your CRN's<br/>
                    <small>Arrange CRN's before copying to clipboard</small>
                    </strong>
                  </Toast.Header>

                  <Toast.Body>
                    <p>CRN'S will be displayed here</p>

                    <input
                      id='order_CRNS'
                      type="button"
                      value="order and copy"
                    />

                  </Toast.Body>
              </Toast>
            }
          </div>

        </div>
      );
    }
}

export default ScheduleList;
