import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './ScheduleList.css';
import star_icon from './star_icon.svg';
import star from './star.svg';
import email_icon from './email_icon.svg';
import delete_icon from './delete_icon.svg';

function convertHrs(pasthrs, hrs, mins) {
  //let temp_mins = mins
  let first_shade, second_shade, new_hr = 0
  first_shade = parseInt(mins)

  second_shade = 60 - first_shade

  first_shade = (first_shade / 60) * 100
  first_shade = first_shade + '%'

  if (second_shade >= hrs) {
    second_shade = hrs
  } else {
    new_hr = hrs - second_shade
    second_shade = 60
  }

  second_shade = (second_shade / 60) * 100
  second_shade = second_shade + '%'

  if (pasthrs === 0) {
    return {first: first_shade, second: second_shade, third: new_hr}
  }

  if (pasthrs > 60) {
    return {first: ((pasthrs / 60) * 100) + '%' , second: first_shade, third: pasthrs - 60}
  }

  return {first: ((pasthrs / 60) * 100) + '%' , second: first_shade, third: hrs - (60 - parseInt(mins))}

}

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
          show: false,
          all_crn: []
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
      header.splice(6, 3);
      return header.map((key, index) => {
        return <th key={index}>{key}</th>
      })
    }

    // contents of the schedule-table
    renderTableData() {

      const { all_crn } = this.state

      let col_content, pasthrs = {Mon: 0, Tues: 0, Wed: 0, Thurs: 0, Fri: 0}, hr_percent = {Mon: 0, Tues: 0, Wed: 0, Thurs: 0, Fri: 0}
      let col_array = ['#ffc0cb', '#4287f5', '#a337e6', '#d82feb', '#ed5170', '#ffa500', '#00ffff', '#b300b3', '#228B22']
      let past_classId = {Mon: 0, Tues: 0, Wed: 0, Thurs: 0, Fri: 0}

      if (this.state.col_contents) {
        col_content = "small_cols"
      } else {
        col_content = "large_cols"
      }

      return this.state.itemArray.map((itemArray, index) => {
        const { time, Mon, Tues, Wed, Thurs, Fri, class_id, hrs, mins } = itemArray // destructuring

        let mon_color = '#ffffff', tues_color = '#ffffff', wed_color = '#ffffff', thurs_color = '#ffffff', fri_color = '#ffffff'
        let mon_color1 = '#ffffff', tues_color1 = '#ffffff', wed_color1 = '#ffffff', thurs_color1 = '#ffffff', fri_color1 = '#ffffff'
        let mon_color2 = '#ffffff', tues_color2 = '#ffffff', wed_color2 = '#ffffff', thurs_color2 = '#ffffff', fri_color2 = '#ffffff'

        if (Mon !== '') {

          if (pasthrs.Mon !== 0) {
            mon_color1 = col_array[past_classId.Mon]
            mon_color2 = col_array[class_id.Mon]
          } else {
            mon_color = col_array[class_id.Mon]
          }

          if (!hrs.Mon) {
            hr_percent.Mon = convertHrs(pasthrs.Mon, 60, '00')
            pasthrs.Mon = hr_percent.Mon.third
          } else {
            hr_percent.Mon = convertHrs(pasthrs.Mon, hrs.Mon, mins.Mon)
            pasthrs.Mon = hr_percent.Mon.third
          }

          past_classId.Mon = class_id.Mon

        } else {
          if (pasthrs.Mon !== 0) {
            mon_color1 = col_array[past_classId.Mon]
          }

          hr_percent.Mon = convertHrs(pasthrs.Mon, 60, '00')
          pasthrs.Mon = hr_percent.Mon.third
        }

        if (Tues !== '') {

          if (pasthrs.Tues !== 0) {
            tues_color1 = col_array[past_classId.Tues]
            tues_color2 = col_array[class_id.Tues]
          } else {
            tues_color = col_array[class_id.Tues]
          }

          if (!hrs.Tues) {
            hr_percent.Tues = convertHrs(pasthrs.Tues, 60, '00')
            pasthrs.Tues = hr_percent.Tues.third
          } else {
            hr_percent.Tues = convertHrs(pasthrs.Tues, hrs.Tues, mins.Tues)

            pasthrs.Tues = hr_percent.Tues.third
          }

          past_classId.Tues = class_id.Tues

        } else {
          if (pasthrs.Tues !== 0) {
            tues_color1 = col_array[past_classId.Tues]
          }

          hr_percent.Tues = convertHrs(pasthrs.Tues, 60, '00')
          pasthrs.Tues = hr_percent.Tues.third

        }

        if (Wed !== '') {

          if (pasthrs.Wed!== 0) {
            wed_color1 = col_array[past_classId.Wed]
            wed_color2 = col_array[class_id.Wed]
          } else {
            wed_color = col_array[class_id.Wed]
          }

          if (!hrs.Wed) {
            hr_percent.Wed = convertHrs(pasthrs.Wed, 60, '00')
            pasthrs.Wed = hr_percent.Wed.third
          } else {
            hr_percent.Wed = convertHrs(pasthrs.Wed, hrs.Wed, mins.Wed)
            pasthrs.Wed = hr_percent.Wed.third
          }

          past_classId.Wed = class_id.Wed


        } else {
          if (pasthrs.Wed !== 0) {
            wed_color1 = col_array[past_classId.Wed]
          }

          hr_percent.Wed = convertHrs(pasthrs.Wed, 60, '00')
          pasthrs.Wed = hr_percent.Wed.third
        }

        if (Thurs !== '') {

          if (pasthrs.Thurs !== 0) {
            thurs_color1 = col_array[past_classId.Thurs]
            thurs_color2 = col_array[class_id.Thurs]
          } else {
            thurs_color = col_array[class_id.Thurs]
          }

          past_classId.Thurs = class_id.Thurs


          if (!hrs.Thurs) {
            hr_percent.Thurs = convertHrs(pasthrs.Thurs, 60, '00')
            pasthrs.Thurs = hr_percent.Thurs.third
          } else {
            hr_percent.Thurs = convertHrs(pasthrs.Thurs, hrs.Thurs, mins.Thurs)
            pasthrs.Thurs = hr_percent.Thurs.third
          }

        } else {
          if (pasthrs.Thurs !== 0) {
            thurs_color1 = col_array[past_classId.Thurs]
          }

          hr_percent.Thurs = convertHrs(pasthrs.Thurs, 60, '00')
          pasthrs.Thurs = hr_percent.Thurs.third

        }

        if (Fri !== '') {

          if (pasthrs.Fri !== 0) {
            fri_color1 = col_array[past_classId.Fri]
            fri_color2 = col_array[class_id.Fri]
          } else {
            fri_color = col_array[class_id.Fri]
          }

          past_classId.Fri = class_id.Fri

          if (!hrs.Fri) {
            hr_percent.Fri = convertHrs(pasthrs.Fri, 60, '00')
            pasthrs.Fri = hr_percent.Fri.third
          } else {
            hr_percent.Fri = convertHrs(pasthrs.Fri, hrs.Fri, mins.Fri)
            pasthrs.Fri = hr_percent.Fri.third
          }

        } else {
          if (pasthrs.Fri !== 0) {
            fri_color1 = col_array[past_classId.Fri]
          }

          hr_percent.Fri = convertHrs(pasthrs.Fri, 60, '00')
          pasthrs.Fri = hr_percent.Fri.third
        }

        return (
          <tr className={col_content} key={time.slice(0, time.search(/[:]/g))}>
            <td className={col_content}>{time}</td>
            <td style={{background: `linear-gradient(to bottom, ${mon_color1} ${hr_percent.Mon.first}, ${mon_color} ${hr_percent.Mon.first} ${hr_percent.Mon.second}, ${mon_color2} ${hr_percent.Mon.second} )`}} className={col_content}>{Mon}</td>
            <td style={{background: `linear-gradient(to bottom, ${tues_color1} ${hr_percent.Tues.first}, ${tues_color} ${hr_percent.Tues.first} ${hr_percent.Tues.second},${tues_color2} ${hr_percent.Tues.second} )`}} className={col_content}>{Tues}</td>
            <td style={{background: `linear-gradient(to bottom, ${wed_color1} ${hr_percent.Wed.first}, ${wed_color} ${hr_percent.Wed.first} ${hr_percent.Wed.second}, ${wed_color2} ${hr_percent.Wed.second} )`}} className={col_content}>{Wed}</td>
            <td style={{background: `linear-gradient(to bottom, ${thurs_color1} ${hr_percent.Thurs.first}, ${thurs_color} ${hr_percent.Thurs.first} ${hr_percent.Thurs.second}, ${thurs_color2} ${hr_percent.Thurs.second} )`}} className={col_content}>{Thurs}</td>
            <td style={{background: `linear-gradient(to bottom, ${fri_color1} ${hr_percent.Fri.first}, ${fri_color} ${hr_percent.Fri.first} ${hr_percent.Fri.second}, ${fri_color2} ${hr_percent.Fri.second} )`}} className={col_content}>{Fri}</td>
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
      const { all_crn, icon, title, show } = this.state;
      const width_change = {
        width: this.state.width ? this.state.width + 'px' : '140px'
      }

      let header_color = this.state.color ? "beforeButton" : "afterButton"
      let temp_crn = [], raw_crn

      this.state.itemArray.map((itemArray, index) => {
        const { time, Mon, Tues, Wed, Thurs, Fri, class_id, hrs, mins } = itemArray // destructuring

        if (Mon !== '') {
          raw_crn = Mon.split(' ')
          temp_crn.push(raw_crn[1] + ' ' + raw_crn[3])
        }

        if (Tues !== '') {
          raw_crn = Tues.split(' ')
          temp_crn.push(raw_crn[1] + ' ' + raw_crn[3])
        }

        if (Wed !== '') {
          raw_crn = Wed.split(' ')
          temp_crn.push(raw_crn[1] + ' ' + raw_crn[3])
        }

        if (Thurs !== '') {
          raw_crn = Thurs.split(' ')
          temp_crn.push(raw_crn[1] + ' ' + raw_crn[3])
        }

        if (Fri !== '') {
          raw_crn = Fri.split(' ')
          temp_crn.push(raw_crn[1] + ' ' + raw_crn[3])
        }

      })

      temp_crn = [...new Set(temp_crn)]

      // temp_crn.map(crn => {
      //   return (
      //     <small>{crn}<br/></small>
      //   );
      // })

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
                    {temp_crn.toString()}

                    <CopyToClipboard text={temp_crn.toString()}
                      onCopy={() => this.setState({show: false})}>
                      <input
                        id='order_CRNS'
                        type="button"
                        value="copy"
                      />
                    </CopyToClipboard>

                  </Toast.Body>
              </Toast>
            }
          </div>

        </div>
      );
    }
}

export default ScheduleList;
