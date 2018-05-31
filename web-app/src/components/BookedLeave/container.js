import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import Moment from 'moment';
import { cancelHoliday, getHolidays } from '../../services/holidayService';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      user: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        bookedHolidays: [],
      };
    }
    
    componentDidMount() {
      getHolidays(this.props.user.id)
        .then(response => {
          const bookedHolidays = response.data.filter(hol => {
            return this.isDateInTheFuture(hol.date);
          });
          this.setState({ bookedHolidays });
        })
        .catch(error => {
          Swal({
            title: 'Could not get booked holidays',
            text: error.message,
            type: 'error',
          });
        });
    }

    canCancelHoliday = (holiday) => {
      const now = ( new Date() ).setHours(0,0,0,0);

      if (holiday.date < now) {
        return false;
      }
      return true;
    }

    cancelHoliday = (holiday) => {
      Swal({
        title: 'Are you sure?',
        text: 'Once cancelled, you will need to follow the leave request process again if you change your mind. Cancel holiday?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
        showCancelButton: true,
        confirmButtonText: 'Cancel Holiday',
        cancelButtonText: 'Keep Holiday',        
      })
        .then((cancel) => {
          if (cancel.value === true) {
            this.handleCancelHoliday(holiday);
          }
        });
    }

    handleCancelHoliday = (holiday) => {

      if (!this.canCancelHoliday(holiday)) {
        Swal({
          title: 'Unable to cancel',
          text: 'Cannot cancel a holiday that has already been taken.',
          type: 'error',
        });

        return;
      }

      cancelHoliday(holiday.holidayId)
        .then((response) => {
          const bookedHolidays = this.state.bookedHolidays.filter(hol => {
            return hol.holidayId != holidayId;
          });
          this.setState({ bookedHolidays });
        })
        .catch(error => {
          Swal({
            title: 'Could not cancel this holiday',
            text: error.message,
            type: 'error',
          });
        });
    }

    isDateInTheFuture(date) {
      return Moment(date).isAfter(new Date());
    }

    render() {
      return (
        <Wrapped 
          bookedHolidays={this.state.bookedHolidays}
          cancelHoliday={this.cancelHoliday} 
          {...this.props} />
      );
    }
  };
