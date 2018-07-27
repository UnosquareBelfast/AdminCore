import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Toast } from '../../utilities/Notifications';
import moment from 'moment';

const BookingCalendarContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.any,
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
          title: null,
          end: moment(end),
          eventType: {
            eventTypeId: 1,
            description: 'annual leave',
          },
          eventStatus: {
            eventStatusId: 1,
            description: 'Awaiting Approval',
          },
          isEventBeingUpdated: false,
          isHalfday: false,
          start: moment(start),
        };
        this.props.updateBookingAndDuration(booking);
      } else {
        Toast({
          type: 'warning',
          title: 'Unable to select past dates',
        });
      }
    };

    onSelectEvent = booking => {
      if (booking.employee.employeeId == this.props.employeeId) {
        const updatedBooking = {
          ...booking,
          isEventBeingUpdated: true,
        };
        this.props.updateBookingAndDuration(updatedBooking);
      } else {
        Toast({
          type: 'warning',
          title: `Unable to update ${booking.employee.forename}'s events`,
        });
      }
    };

    render() {
      return (
        this.props.employeeId &&
        this.props.takenHolidays && (
          <Wrapped
            onSelectSlot={this.onSelectSlot}
            onSelectEvent={this.onSelectEvent}
            takenHolidays={this.props.takenHolidays}
            updateTakenHolidays={this.getTakenHolidays}
          />
        )
      );
    }
  };

export default BookingCalendarContainer;
