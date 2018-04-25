import React, { Component } from 'react';
import 'react-bootstrap';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'moment/locale/nb';
import MyLeaveTrackerList from '../common/MyLeaveTrackerList';
import TakenLeaveList from '../common/TakenLeaveList';
import BookHolidayModal from '../modals/BookHolidayModal';

const holidays = [
    {
        id: '1',
        date: new Date("2018/01/01")
    },
    {
        id: '2',
        date: new Date("2018/04/14")
    },
    {
        id: '3',
        date: new Date("2018/07/12")
    },
    {
        id: '4',
        date: new Date("2018/12/25")
    }
];

localStorage.setItem('holidays', JSON.stringify(holidays));

class HomePage extends Component {

  constructor(props){
    super(props);

    this.state = {
        date: moment(),
        holidays: JSON.parse(localStorage.getItem('holidays')),
        bookingModalOpen: false,
        bookedHolidays: []
    }

    this.getHolidays = this.getHolidays.bind(this);
    this.onDeleteHoliday = this.onDeleteHoliday.bind(this);
  }

  componentWillMount(){
    const holidays = this.getHolidays();
    const bookedHolidays = this.getFutureHolidays();
    this.setState({holidays : holidays});
    this.setState({bookedHolidays : bookedHolidays});
  }

  getHolidays(){
    return this.state.holidays;
  }

  isDateInThePast(date){
    return moment(date).isBefore(new Date());
  }

  isDateInTheFuture(date){
    return moment(date).isAfter(new Date());
  }

  getPastHolidays(){
    return this.state.holidays.filter(holiday => { return this.isDateInThePast(holiday.date)})
  }

  getFutureHolidays(){  
    return this.state.holidays.filter(holiday => { return this.isDateInTheFuture(holiday.date)})
  }

  onDeleteHoliday(holiday){
    // api call delete holiday
    // if successful, delete holiday from list, otherwise display error
    const holidays = this.state.bookedHolidays;
    const filteredHolidays = holidays.filter(hol => {
      return hol.id !== holiday.id;
    });

    this.setState({bookedHolidays: filteredHolidays});
  }

  toggleHolidayModal = () => {
      this.setState({
        bookingModalOpen: !this.state.bookingModalOpen
      });
  }

  render() {

    return (
        <div className='RowC'>
            <div className='LeaveTrackerList'>
                <span>Days Taken:</span>
                <TakenLeaveList
                    holidays={this.getPastHolidays()}/>
                    <br/>
                <span>Days Booked:</span>
                <MyLeaveTrackerList
                    holidays={this.state.bookedHolidays}
                    onDeleteHoliday={this.onDeleteHoliday}
                />
            </div>
            <div className='CalendarDiv'>
                <span>Days Remaining: 23</span>
                
                <Calendar className='CalendarStyling'                    
                    onChangeMonth={(date) => this.setState({ date })}
                    date={this.state.date}
                    onPickDate={(date => console.log(date))}
                />
                <br/>
                <button onClick={this.toggleHolidayModal}>Book Holiday</button>
                <BookHolidayModal
                    show={this.state.bookingModalOpen}
                    onClose={this.toggleHolidayModal}>
                    blah blah blah
                </BookHolidayModal>
            </div>
        </div>
    );
  }
}

export default HomePage;
