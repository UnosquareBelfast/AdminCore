import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  selectBooking,
  toggleBookingModal,
  setEventBeingUpdated,
  updateEventDuration,
} from '../../actions/dashboard';
import { Toast } from '../../utilities/Notifications';
import moment from 'moment';

const BookingCalendarContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number,
      takenHolidays: PT.array,
      selectBooking: PT.func,
      updateEventDuration: PT.func,
      setEventBeingUpdated: PT.func,
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
      this.props.updateEventDuration(event);
      this.props.setEventBeingUpdated(isBeingUpdated);
    };

    onSelectSlot = ({ start, end }) => {
      const today = new moment();
      if (moment(start).isAfter(today.add(-1, 'days'))) {
        let booking = {
          holidayId: -1,
          start: new moment(start),
          end: new moment(end),
          title: null,
          isHalfday: false,
          eventType: {
            eventTypeId: 1,
            description: 'Annual leave',
          },
          eventStatus: {
            eventStatusId: 1,
            description: 'Awaiting Approval',
          },
          employee: null,
        };
        this.props.selectBooking(booking);
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
          this.props.selectBooking(event);
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
    selectBooking: booking => dispatch(selectBooking(booking)),
    updateEventDuration: event => dispatch(updateEventDuration(event)),
    setEventBeingUpdated: isUpdated =>
      dispatch(setEventBeingUpdated(isUpdated)),
    toggleBookingModal: open => dispatch(toggleBookingModal(open)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  BookingCalendarContainer
);
