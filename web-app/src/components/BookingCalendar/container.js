import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import { Toast } from '../../utilities/Notifications';
import moment from 'moment';

const BookingCalendarContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object,
      takenHolidays: PT.array,
      updateBookingAndDuration: PT.func,
    };

    constructor(props) {
      super(props);
    }

    onSelectSlot = ({ start, end }) => {
      const today = new moment();
      if (moment(start).isAfter(today.add(-1, 'days'))) {
        let booking = {
          end: moment(end),
          eventStatusId: 1,
          isEventBeingUpdated: false,
          isHalfday: false,
          isWFH: false,
          start: moment(start),
        };
        this.props.updateBookingAndDuration(booking);
      } else {
        Toast({
          type: 'Sorry',
          title: 'Unable to select past dates',
        });
      }
    };

    onSelectEvent = booking => {
      if (booking.employeeId == this.props.userDetails.employeeId) {
        const updatedBooking = {
          ...booking,
          isEventBeingUpdated: true,
        };
        this.props.updateBookingAndDuration(updatedBooking);
      } else {
        Toast({
          type: 'Unable to update other peoples events',
          title: 'Sorry',
        });
      }
    };

    render() {
      return (
        this.props.userDetails &&
        this.props.takenHolidays && (
          <Wrapped
            onSelectSlot={this.onSelectSlot}
            onSelectEvent={this.onSelectEvent}
            takenHolidays={this.props.takenHolidays}
            updateTakenHolidays={this.getTakenHolidays}
            userDetails={this.props.userDetails}
          />
        )
      );
    }
  };

export default BookingCalendarContainer;
