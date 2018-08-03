import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions/index';
import { Toast } from '../../utilities/Notifications';
import moment from 'moment';

const BookingCalendarContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number,
      takenHolidays: PT.array,
      onUpdateBooking: PT.func,
      onUpdateDuration: PT.func,
      onOpenModal: PT.func,
    };

    constructor(props) {
      super(props);
    }

    onSelectSlot = ({ start, end }) => {
      const today = new moment();
      if (moment(start).isAfter(today.add(-1, 'days'))) {
        let booking = {
          holidayId: -1,
          title: null,
          start: new moment(start),
          end: new moment(end),
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
        this.props.onOpenModal(true);
        const isEventBeingUpdated = false;
        this.props.onUpdateBooking(booking, isEventBeingUpdated);
        this.props.onUpdateDuration({ ...booking });
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
          this.props.onOpenModal(true);
          const isEventBeingUpdated = true;
          this.props.onUpdateBooking(event, isEventBeingUpdated);
          this.props.onUpdateDuration({ ...event });
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
      dispatch(actions.updateBooking(booking, isEventBeingUpdated)),
    onUpdateDuration: event => dispatch(actions.updateBookingDuration(event)),
    onOpenModal: closeModal => dispatch(actions.toggleBookingModal(closeModal)),
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  BookingCalendarContainer,
);
