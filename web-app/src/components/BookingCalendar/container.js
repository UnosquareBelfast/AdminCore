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

    selectedSlotsOverlapExisting = (start, end) => {
      return this.props.takenHolidays.filter(hol => {
        if (hol.employee && hol.employee.employeeId === this.props.employeeId) {
          var newRange = moment.range(moment(start), moment(end).endOf('day'));
          var existingRange = moment.range(moment(hol.start), moment(hol.end));
          if (newRange.overlaps(existingRange)) {
            return true;
          }
        }
      });
    };

    validateSelectedSlots = (start, end) => {
      const today = new moment();
      const pastDatesSelected = moment(start).isBefore(today);
      if (pastDatesSelected) {
        return [false, 'Unable to select past dates'];
      } else {
        const overlappingEvents = this.selectedSlotsOverlapExisting(start, end);
        if (overlappingEvents.length > 0) {
          return [
            false,
            'Your are trying to request dates that have already been set',
          ];
        } else {
          return [true, 'dates approved'];
        }
      }
    };

    onSelectSlot = ({ start, end }) => {
      const [newDatesApproved, message] = this.validateSelectedSlots(
        start,
        end,
      );
      if (newDatesApproved) {
        let booking = {
          holidayId: -1,
          start: new moment(start),
          end: new moment(end),
          title: null,
          isHalfday: false,
          eventType: {
            eventTypeId: eventTypes.HOLIDAY,
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
          title: message,
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
  connect(
    null,
    mapDispatchToProps,
  ),
  BookingCalendarContainer,
);
