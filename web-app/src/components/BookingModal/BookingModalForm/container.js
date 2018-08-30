import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectBooking, updateEventDuration } from '../../../actions/dashboard';
import {
  checkIfPastDatesSelected,
  checkIfDatesFallOnWeekend,
  startDateValidation,
  endDateValidation,
  halfDayValidation,
} from '../../../utilities/dashboardEvents';
import { Toast } from '../../../utilities/Notifications';
import moment from 'moment';
import { eventBeingUpdated } from '../../../reducers';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object.isRequired,
      allEvents: PT.array.isRequired,
      selectBooking: PT.func.isRequired,
      booking: PT.object.isRequired,
      isEventBeingUpdated: PT.bool,
      updateEventDuration: PT.func,
      bookingDuration: PT.number,
      createEvent: PT.func.isRequired,
      updateEvent: PT.func.isRequired,
    };

    static defaultProps = {
      isEventBeingUpdated: false,
      bookingDuration: 1,
    };

    constructor(props) {
      super(props);
      this.state = {
        formData: {
          end: moment(),
          eventTypeId: 1,
          isHalfday: false,
          start: moment(),
        },
        formIsValid: true,
      };
    }

    componentDidMount = () => {
      const {
        booking: { start, end, eventType, halfDay },
      } = this.props;
      this.setState({
        formData: {
          start: start,
          end: end,
          eventTypeId: eventType.eventTypeId,
          isHalfday: halfDay || false,
        },
      });
    };

    handleCalendarValidation({ start, end }) {
      const pastDatesSelected = checkIfPastDatesSelected(start);
      const datesFallOnWeekend = checkIfDatesFallOnWeekend(start, end);
      if (pastDatesSelected) {
        return 'Unable to select past dates';
      } else if (datesFallOnWeekend) {
        return 'Unable to select weekend dates';
      } else {
        return 'Dates approved';
      }
    }

    handleFormStatus(name, value, formIsValid) {
      let formData = { ...this.state.formData };
      formData[name] = value;

      if (name === 'start') {
        formData = startDateValidation(formData);
      } else if (name === 'end') {
        formData = endDateValidation(formData);
      } else if (name === 'isHalfday' && formData.isHalfday) {
        formData = halfDayValidation(formData);
      } else if (name === 'eventTypeId') {
        formData[name] = parseInt(value);
      }

      if (name === 'start' || name === 'end') {
        const calendarValidationResults = this.handleCalendarValidation(
          formData,
        );
        formIsValid = calendarValidationResults === 'Dates approved';
        Toast({
          type: formIsValid ? 'success' : 'warning',
          title: calendarValidationResults,
        });
      }

      this.setState({
        formData,
        formIsValid,
      });

      const { updateEventDuration } = this.props;
      updateEventDuration({
        ...formData,
        eventType: {
          eventTypeId: formData.eventTypeId,
        },
      });
    }

    render() {
      const { formData, formIsValid } = this.state;
      const {
        bookingDuration,
        createEvent,
        updateEvent,
        isEventBeingUpdated,
      } = this.props;
      return (
        <Wrapped
          formData={formData}
          isEventBeingUpdated={isEventBeingUpdated}
          bookingDuration={bookingDuration}
          formIsValid={formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          createEvent={event => createEvent(event, formData)}
          updateEvent={event => updateEvent(event, formData)}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    isEventBeingUpdated: eventBeingUpdated(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectBooking: updatedBooking => dispatch(selectBooking(updatedBooking)),
    updateEventDuration: event => dispatch(updateEventDuration(event)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  Container,
);
