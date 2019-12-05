import React, { Component } from 'react';

// functions
function subtractTime(time_str){

  let first = time_str.slice(0, time_str.indexOf(':'))
  let second = time_str.slice(time_str.lastIndexOf(':') - 2, time_str.lastIndexOf(':')).replace(/-/gi, '')

  let firstMins = time_str.slice(time_str.indexOf(':') + 1, time_str.indexOf(':') + 3)
  let secondMins = time_str.slice(time_str.lastIndexOf(':') + 1, time_str.lastIndexOf(':') + 3)

  first = parseInt(second) - parseInt(first)
  firstMins = parseInt(secondMins) - parseInt(firstMins)

  if (firstMins < 0){
    first -= 1
    firstMins = 60 + firstMins
  }

  first *= 60
  first += firstMins

  return first

}

function populateSchedule(courses) {
  let prev_time = [0] // the zero jump starts the loop  below
  let all_courses = []
  let formatted = []
  let slots = [
    {time: '8:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '9:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '10:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '11:00 am', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '12:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '1:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '2:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '3:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''},
    {time: '4:00 pm', Mon: '', Tues: '', Wed: '', Thurs: '', Fri: '', class_id: '', hrs:''}
  ]

  courses.forEach((course, index) => {
    let day_time = course.timesOffered
    let course_number = course.title.substring(0, course.title.indexOf('-') -1)
    let dash_loc, course_time, time_array = [], classId = index

    while(day_time.includes('-')) {
      dash_loc = day_time.indexOf('-')
      time_array.push(day_time.substring(0, dash_loc + 10))
      day_time = day_time.substring(dash_loc + 11)
    }

    time_array.forEach(time_item => {
      let time = '', mon = '', tues = '', wed = '', thurs = '', fri = '', end = 0, hr = 0, day

      time_item = time_item.replace(/ am/gi, '')
      time_item = time_item.replace(/ pm/gi, '')

      dash_loc = time_item.indexOf('-')

      let time_str = time_item.substring(dash_loc - 6).replace(/ /gi, '')

      hr = subtractTime(time_str)

      let item_array = time_item.substring(0, dash_loc - 1).split(' ')

      item_array.forEach(item => {

        if (!parseInt(item.slice(0, 1))) {

          if (item.slice(0, 1) === 'T') {
            end = 4
          } else {
            end = 3
          }

          day = item.slice(0, end)
          course_time = time_str + ' ' + course_number.replace(' ', '') + ' ' + 'PLACES' + ' ' + 'CRN0000'

          if (day === 'Mon') {
            mon = course_time
          } else if (day === 'Tues') {
            tues = course_time
          } else if (day === 'Wed') {
            wed = course_time
          } else if (day === 'Thur') {
            thurs = course_time
          } else if (day === 'Fri') {
            fri = course_time
          }

        } else {

          let num = item.slice(0, item.indexOf(':'))

          if (['8', '9', '10', '11'].includes(num)) {
            time = item + ' am'
          } else {
            time = item + ' pm'
          }
        }
      })
      console.log({time: time, Mon: mon, Tues: tues, Wed: wed, Thurs: thurs, Fri: fri, class_id: classId, hrs: hr});
      prev_time.forEach(previous => {
        if (!prev_time.includes(time)) {
          all_courses.push({time: time, Mon: mon, Tues: tues, Wed: wed, Thurs: thurs, Fri: fri, class_id: classId, hrs: hr})
          prev_time.push(time)
        }
      })

    })

  })
  console.log(all_courses);
      slots.forEach(slot => {
        if(prev_time.includes(slot.time)) {
          formatted.push(all_courses.filter(item_course => item_course.time === slot.time).pop())
        } else {
          formatted.push(slot)
        }
      })
  return formatted

}


class Landing extends Component {

    render() {
        return (
            <h1>Landing.js</h1>
        );
    }
}

export default Landing;
