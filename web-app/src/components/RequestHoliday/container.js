import React from 'react';
import isNil from 'lodash/fp/isNil';
import Moment from 'moment';
import HolidayService from '../../services/holidayService';

export default (Wrapped) => (
    class extends React.Component {

  constructor(props){
      super(props);

      this.state = {
        startDate: Moment(),
        endDate: Moment(),
        halfDayChecked: false
      }

      this.HolidayService = new HolidayService();

      this.handleKeyUp = this.handleKeyUp.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
      this.handleStartChange = this.handleStartChange.bind(this);
      this.handleEndChange = this.handleEndChange.bind(this);
      this.handleChangeChk = this.handleChangeChk.bind(this);
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
import Swal from 'sweetalert2';
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
        employee : this.props.user,
        holidayStatusId : 1,
        isHalfDay : this.state.halfDayChecked
      }
  }

  requestHoliday(holiday){
    this.HolidayService.requestHoliday(holiday)
    .then(response =>{
       Swal('Holiday booked', error.message, 'error');
       this.props.onClose;
    })
    .catch(error =>{
        Swal('Could not complete holiday request', error.message, 'error');
    })
  }

  requestHolidays(holidays){
    this.HolidayService.requestHolidays(holidays)
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
        <Wrapped { ...this.state} {...props}
          requestHoliday={ this.requestHoliday }
          requestHolidays={ this.requestHolidays }
          handleChangeChk={ this.handleChangeChk }
          buildHoliday={ this.buildHoliday }
          differenceBetweenDates={ this.differenceBetweenDates }
          confirmHolidayBooking={ this.confirmHolidayBooking }
          handleStartChange={ this.handleStartChange }/>
      );
    }
  }
)
