import React from 'react';
import { PropTypes as PT } from 'prop-types';
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
      let booking = {
        end: moment(end),
        eventStatusId: 1,
        isEventBeingUpdated: false,
        isHalfday: false,
        isWFH: false,
        start: moment(start),
      };
      this.props.updateBookingAndDuration(booking);
    };

    onSelectEvent = booking => {
      const updatedBooking = {
        ...booking,
        isEventBeingUpdated: true,
      };
      this.props.updateBookingAndDuration(updatedBooking);
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
