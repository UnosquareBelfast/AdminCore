import React, { Component } from 'react';
import 'react-bootstrap';
import HolidayTrackerListItem from './HolidayTrackerListItem';

const bookedHolidays = [
    {
        id: '3',
        date: new Date("2018/07/12")
    },
    {
        id: '4',
        date: new Date("2018/12/25")
    }
];

localStorage.setItem('bookedHolidays', JSON.stringify(bookedHolidays));

class MyLeaveTrackerList extends Component {

  constructor(props){
    super(props);

    this.state = {
        bookedHolidays: this.props.holidays //JSON.parse(localStorage.getItem('bookedHolidays'))
    };

    this.onDeleteHoliday = this.onDeleteHoliday.bind(this);
    this.onUpdateHoliday = this.onUpdateHoliday.bind(this);    
  }

  componentWillMount(){
      const bookedHolidays = this.getBookedHolidays();

      this.setState({bookedHolidays});
  }

  getBookedHolidays(){
      return this.props.holidays;
  }

  onDeleteHoliday(holiday){
      // api call delete holiday
      // if successful, delete holiday from list, otherwise display error
    //   const bookedHolidays = this.getBookedHolidays();
    //   const filteredHolidays = bookedHolidays.filter(hol => {
    //     return hol.id !== holiday.id;
    //   });

    //   this.setState({bookedHolidays: filteredHolidays});
    const { onDeleteHoliday } = this.props;
    onDeleteHoliday(holiday);
  }

  onUpdateHoliday(holiday){

  }

  render() {

    let holidays = this.props.holidays;

    return (
        <div>
            {
                this.state.bookedHolidays.map(holiday => {                    
                    return <HolidayTrackerListItem
                        key={holiday.id}
                        {...holiday}
                        onDeleteHoliday={this.onDeleteHoliday}
                        onUpdateHoliday={this.onUpdateHoliday}
                    />                
                })
            }
        </div>
    );
  }
}

export default MyLeaveTrackerList;
