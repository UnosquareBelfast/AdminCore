import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectBooking, updateEventDuration } from '../../../actions/dashboard';
import { validateSelectedDates } from '../../../utilities/dashboardEvents';
import { Toast } from '../../../utilities/Notifications';
import eventTypes from '../../../utilities/eventTypes';
import moment from 'moment';
import { eventBeingUpdated, getUser, getAllEvents } from '../../../reducers';

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
      const {
        userDetails: { employeeId },
        allEvents,
      } = this.props;
      const validatingDatesResult = validateSelectedDates(
        allEvents,
        employeeId,
        start,
        end,
      );
      let formIsValid = validatingDatesResult === 'Dates approved';
      Toast({
        type: formIsValid ? 'success' : 'warning',
        title: validatingDatesResult,
      });

      return formIsValid;
    }

    handleFormStatus(name, value, formIsValid) {
      const formData = { ...this.state.formData };
      formData[name] = value;

      if (name == 'start') {
        if (formData.isHalfday) {
          formData.end = formData.start;
        } else {
          if (formData.start.isAfter(formData.end)) {
            formData.end = formData.start;
          }
        }
      } else if (name == 'end') {
        if (formData.isHalfday) {
          formData.start = formData.end;
        } else {
          if (formData.end.isBefore(formData.start)) {
            formData.start = formData.end;
          }
        }
      } else if (name === 'isHalfday' && formData.isHalfday) {
        formData.end = formData.start;
        formData.eventTypeId = eventTypes.ANNUAL_LEAVE;
      } else if (name === 'eventTypeId') {
        formData[name] = parseInt(value);
      }

      const updatedFormData = {
        ...formData,
        eventType: {
          eventTypeId: formData.eventTypeId,
        },
      };
      this.props.updateEventDuration(updatedFormData);

      if (!this.props.isEventBeingUpdated) {
        formIsValid = this.handleCalendarValidation(formData);
      }

      this.setState({
        formData,
        formIsValid,
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  Container,
);
