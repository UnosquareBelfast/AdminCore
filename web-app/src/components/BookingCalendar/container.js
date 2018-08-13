import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  updateBooking,
  toggleBookingModal,
  eventBeingUpdated,
  updateBookingDuration,
} from '../../actions/dashboard';
import { Toast } from '../../utilities/Notifications';
import moment from 'moment';

const BookingCalendarContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number,
      takenHolidays: PT.array,
      onUpdateBooking: PT.func,
      onUpdateDuration: PT.func,
      onEventBeingUpdated: PT.func,
      toggleBookingModal: PT.func,
    };

    constructor(props) {
      super(props);
    }

    openModal = () => {
      this.props.toggleBookingModal(true);
    };

    bookingModalConfig = (event, isBeingUpdated) => {
      this.openModal();
      this.props.onUpdateDuration(event);
      this.props.onEventBeingUpdated(isBeingUpdated);
    };

    onSelectSlot = ({ start, end }) => {
      const today = new moment();
      if (moment(start).isAfter(today.add(-1, 'days'))) {
        let booking = {
          holidayId: -1,
          start: new moment(start),
          end: new moment(end),
        };
        this.props.onUpdateBooking(booking);
        this.bookingModalConfig({ ...booking }, false);
      } else {
        Toast({
          type: 'warning',
          title: 'Unable to select past dates',
        });
      }
    };

    onSelectEvent = event => {
      if (event.employee) {
        if (event.employee.employeeId == this.props.employeeId) {
          this.props.onUpdateBooking(event);
          this.bookingModalConfig({ ...event }, true);
        } else {
          Toast({
            type: 'warning',
            title: `Unable to update ${event.employee.forename}'s events`,
          });
        }
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

const mapDispatchToProps = dispatch => {
  return {
    onUpdateBooking: (booking, isEventBeingUpdated) =>
      dispatch(updateBooking(booking, isEventBeingUpdated)),
    onUpdateDuration: event => dispatch(updateBookingDuration(event)),
    onEventBeingUpdated: isUpdated => dispatch(eventBeingUpdated(isUpdated)),
    toggleBookingModal: open => dispatch(toggleBookingModal(open)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  BookingCalendarContainer
);
