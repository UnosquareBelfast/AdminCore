import React from 'react';
import Swal from 'sweetalert2';
import Moment from 'moment';
import HolidayService from '../../services/holidayService';

export default (Wrapped) => (
  class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bookedHolidays: []
        };
        this.HolidayService = new HolidayService();
    }

    componentDidMount(){
        this.HolidayService.getHolidays(this.props.user.id)
        .then(response =>{
            const bookedHolidays = response.filter(hol => { return this.isDateInTheFuture(hol.date)});
            this.setState({bookedLeave: bookedHolidays});
        })
        .catch(error =>{
            Swal('Could not get booked holidays', error.message, 'error');
        })
    }

    isDateInTheFuture(date){
        return Moment(date).isAfter(new Date());
    }

    render() {
      return (
        <Wrapped bookedHolidays={this.state.bookedHolidays} {...props} />
      );
    }
  }
)
