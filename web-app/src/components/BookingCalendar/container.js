import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { validateSelectedDates } from '../../utilities/dashboardEvents';
import {
  selectBooking,
  toggleBookingModal,
  setEventBeingUpdated,
  updateEventDuration,
} from '../../actions/dashboard';
import holidayStatus from '../../utilities/holidayStatus';
import eventTypes from '../../utilities/eventTypes';
import { Toast } from '../../utilities/Notifications';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const BookingCalendarContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number,
      events: PT.array,
      selectBooking: PT.func,
      updateEventDuration: PT.func,
      setEventBeingUpdated: PT.func,
      toggleBookingModal: PT.func,
      onNavigate: PT.func,
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
      const { events, employeeId } = this.props;
      const validatingDatesResult = validateSelectedDates(
        events,
        employeeId,
        start,
        end,
      );
      if (validatingDatesResult === 'Dates approved') {
        let booking = {
          start: new moment(start),
          end: new moment(end),
          isHalfday: false,
          eventType: {
            eventTypeId: eventTypes.ANNUAL_LEAVE,
            description: 'Annual leave',
          },
          eventStatus: {
            eventStatusId: holidayStatus.PENDING,
            description: 'Awaiting Approval',
          },
          employee: null,
        };
        this.props.selectBooking(booking);
        this.bookingModalConfig({ ...booking }, false);
      } else {
        Toast({
          type: 'warning',
          title: validatingDatesResult,
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
      const { employeeId, events, onNavigate } = this.props;
      return (
        employeeId &&
        events && (
          <Wrapped
            onSelectSlot={this.onSelectSlot}
            onSelectEvent={this.onSelectEvent}
            onNavigate={onNavigate}
            events={this.props.events}
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
  connect(
    null,
    mapDispatchToProps,
  ),
  BookingCalendarContainer,
);
