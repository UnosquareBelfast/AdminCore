import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/fp/isNil';
import styles from './RequestHoliday.css';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import RequestHolidayService from './RequestHolidayService.js';
import 'react-datepicker/dist/react-datepicker.css';

class RequestHoliday extends React.Component {

  constructor(props){
      super(props);

      this.state = {
        startDate: Moment(),
        endDate: Moment(),
        halfDayChecked: false
      }

      this.RequestHolidayService = new RequestHolidayService();

      this.handleKeyUp = this.handleKeyUp.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
      this.handleStartChange = this.handleStartChange.bind(this);
      this.handleEndChange = this.handleEndChange.bind(this);
      this.confirmHolidayBooking = this.confirmHolidayBooking.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleKeyUp(e) {
    const keys = {
      27: () => {
        e.preventDefault();
        this.props.onClose();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };

    if (keys[e.keyCode]) { keys[e.keyCode](); }
  }
  
  handleOutsideClick(e) {
    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        this.props.onClose();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }

  handleStartChange(value){
    const startDate = value;
    this.setState({startDate:startDate});
  }

  handleEndChange(value){
    const endDate = value;    
    this.setState({endDate:endDate});
  }

  confirmHolidayBooking(){
    const startDate = this.state.startDate._d;
    const endDate = this.state.endDate._d;

    if(endDate > startDate){

        const totalDays =this.differenceBetweenDates(startDate, endDate);

        if( totalDays > 1){

            let holidays = [];

            for(i = 0; i < totalDays; i++){
                holidays.push(this.buildHoliday(Moment(startDate).add(i, 'days')));
            }

            requestHolidays(holidays);

        } else {
            const holiday = buildHoliday(startDate);
            requestHoliday(holiday);
        }

    } else if (startDate > endDate){
      alert('cannot book a holiday that ends before it begins');
    }
  }

  differenceBetweenDates(start, end){
      const oneDay =  24*60*60*1000;
      return Math.round(Math.abs((start.getTime() - end.getTime())/(oneDay)));
  }

  handleChangeChk(){
      this.setState({
        halfDayChecked: !this.state.halfDayChecked
      });
  }

  buildHoliday(date){
      return {
        date : date,
        employee : this.props.employee,
        holidayStatusId : 1,
        isHalfDay : this.state.halfDayChecked
      }
  }

  requestHoliday(holiday){
    this.RequestHolidayService.requestHoliday(holiday)
    .then(response =>{
       Swal('Holiday booked', error.message, 'error');
       this.props.onClose;
    })
    .catch(error =>{
        Swal('Could not complete holiday request', error.message, 'error');
    })
  }

  requestHoliday(holidays){
    this.RequestHolidayService.requestHolidays(holidays)
    .then(response =>{
       Swal('Holiday booked', error.message, 'error');
       this.props.onClose;
    })
    .catch(error =>{
        Swal('Could not complete holiday request', error.message, 'error');
    })
  }

  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div style={style.BackdropStyle}>        
        <div style={style.ModalStyle}>
        <h3>Book Holiday?</h3>
        <br/>
        <h5>From:</h5>
        <div>
          <DatePicker
              selected={this.state.startDate}
              onChange={this.handleStartChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="time"
          />
        </div>
        <br/>
        <h5>To:</h5>
        <div>
          <DatePicker
              selected={this.state.endDate}
              onChange={this.handleEndChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="time"              
          />
        </div>
        <br/>
        <label>
            <input type="checkbox" defaultChecked={this.state.halfDayChecked} onChange={this.handleChangeChk} />
            Half-Day
        </label>
        <br/>
        <button className="btn btn-danger" onClick={this.confirmHolidayBooking}>
            Confirm
        </button>
        <button className="btn btn-info" onClick={this.props.onClose}>
            Cancel
        </button>
        </div>
      </div>
    );
  }
}

BookHolidayModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool
};

export default RequestHoliday;