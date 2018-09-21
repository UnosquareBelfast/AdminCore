import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectBooking, updateEventDuration } from '../../../actions/dashboard';
import {
  validationMessage,
  checkIfPastDatesSelected,
  checkIfDatesFallOnWeekend,
  checkIfSelectedDatesOverlapExisting,
  startDateValidation,
  endDateValidation,
  halfDayValidation,
} from '../../../utilities/dashboardEvents';
import { Toast } from '../../../utilities/Notifications';
import moment from 'moment';
import { getUser, getAllEvents, eventBeingUpdated } from '../../../reducers';

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
      toggleRejectionResponseView: PT.bool.isRequired,
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
          employeeRejectionMessage: '',
          updateMessage: '',
        },
        formIsValid: true,
        capturedRejectionReponseText: '',
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
          employeeRejectionMessage: '',
          updateMessage: '',
        },
      });
    };

    assignRejectionResponseText = e => {
      this.setState({ capturedRejectionReponseText: e.target.value });
    };

    handleCalendarValidation({ start, end }) {
      const pastDatesSelected = checkIfPastDatesSelected(start);
      const datesFallOnWeekend = checkIfDatesFallOnWeekend(start, end);
      if (pastDatesSelected) {
        return validationMessage.PAST_DATES_SELECTED;
      } else if (datesFallOnWeekend) {
        return validationMessage.WEEKEND_DATES_SELECTED;
      } else {
        const {
          userDetails: { employeeId },
          allEvents,
          booking: { eventId },
        } = this.props;

        const datesOverlapExisting = checkIfSelectedDatesOverlapExisting(
          allEvents,
          employeeId,
          start,
          end,
          eventId
        );
        if (datesOverlapExisting) {
          return validationMessage.DATES_ALREADY_REQUESTED;
        } else {
          return validationMessage.DATES_APPROVED;
        }
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
          formData
        );
        formIsValid =
          calendarValidationResults === validationMessage.DATES_APPROVED;
        if (!formIsValid) {
          Toast({
            type: 'warning',
            title: calendarValidationResults,
          });
        }
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
      const {
        formData,
        formIsValid,
        capturedRejectionReponseText,
      } = this.state;
      const {
        bookingDuration,
        createEvent,
        updateEvent,
        isEventBeingUpdated,
        toggleRejectionResponseView,
        booking,
      } = this.props;
      return (
        <Wrapped
          formData={formData}
          booking={booking}
          capturedRejectionReponseText={capturedRejectionReponseText}
          assignRejectionResponseText={this.assignRejectionResponseText}
          toggleRejectionResponseView={toggleRejectionResponseView}
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
    userDetails: getUser(state),
    allEvents: getAllEvents(state),
    isEventBeingUpdated: eventBeingUpdated(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectBooking: updatedBooking => dispatch(selectBooking(updatedBooking)),
    updateEventDuration: event => dispatch(updateEventDuration(event)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), Container);
