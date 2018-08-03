import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../../actions/index';
import Swal from 'sweetalert2';
import moment from 'moment';
import {
  updateHoliday,
  requestHoliday,
  rejectHoliday,
} from '../../../services/holidayService';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number.isRequired,
      updateTakenHolidays: PT.func.isRequired,
      onUpdateBooking: PT.func.isRequired,
      onOpenModal: PT.func.isRequired,
      booking: PT.object.isRequired,
      isEventBeingUpdated: PT.bool,
      bookingDuration: PT.number,
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
      this.setState({
        formData: {
          end: this.props.booking.end,
          eventTypeId: this.props.booking.eventType.eventTypeId,
          isHalfday: this.props.booking.halfDay || false,
          start: this.props.booking.start,
        },
      });
    };

    shouldComponentUpdate(nextProps) {
      if (this.state.formData.end !== nextProps.booking.end) {
        this.setState({
          formData: {
            end: nextProps.booking.end,
            eventTypeId: nextProps.booking.eventType.eventTypeId,
            isHalfday: nextProps.booking.halfDay || false,
            start: nextProps.booking.start,
          },
        });
        return true;
      } else {
        return false;
      }
    }

    handleMakeHolidayRequest = event => {
      event.preventDefault();
      const { start, end, isHalfday, eventTypeId } = this.state.formData;
      const dateFormat = 'YYYY-MM-DD';

      const request = {
        dates: [
          {
            startDate: start.format(dateFormat),
            endDate: end.format(dateFormat),
            halfDay: isHalfday,
          },
        ],
        eventTypeId: eventTypeId,
        employeeId: this.props.employeeId,
      };

      requestHoliday(request).then(() => {
        this.props.updateTakenHolidays();
        this.props.onOpenModal(false);
      });
    };

    handleUpdateHolidayRequest = (event, cancel) => {
      event.preventDefault();

      const { holidayId } = this.props.booking;
      const { updateTakenHolidays, onOpenModal } = this.props;
      if (cancel) {
        rejectHoliday(holidayId)
          .then(() => {
            updateTakenHolidays();
            onOpenModal(false);
          })
          .catch(error => {
            Swal({
              title: 'Sorry, not able to reject your holiday request.',
              text: error.message,
              type: 'error',
            });
            onOpenModal(false);
          });
      } else {
        const { start, end, isHalfday } = this.state.formData;
        const dateFormat = 'YYYY-MM-DD';
        const request = {
          endDate: end.format(dateFormat),
          halfDay: isHalfday,
          holidayId: holidayId,
          startDate: start.format(dateFormat),
        };

        updateHoliday(request)
          .then(() => {
            updateTakenHolidays();
            onOpenModal(false);
          })
          .catch(error => {
            Swal({
              title: 'Sorry, not able to update your holiday request.',
              text: error.message,
              type: 'error',
            });
            onOpenModal(false);
          });
      }
    };

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
        formData.eventTypeId = 1;
      }

      this.setState(
        {
          formData,
          formIsValid,
        },
        () => {
          this.props.onUpdateBooking(formData, false);
        },
      );
    }

    render() {
      return (
        <Wrapped
          formData={this.state.formData}
          isEventBeingUpdated={this.props.isEventBeingUpdated}
          bookingDuration={this.props.bookingDuration}
          formIsValid={this.state.formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          submitHolidayRequest={event => this.handleMakeHolidayRequest(event)}
          updateHolidayRequest={event =>
            this.handleUpdateHolidayRequest(event, false)
          }
          deleteHolidayRequest={event =>
            this.handleUpdateHolidayRequest(event, true)
          }
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    isEventBeingUpdated: state.DASHBOARD.isEventBeingUpdated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateBooking: updatedBooking =>
      dispatch(actions.updateBooking(updatedBooking)),
    onOpenModal: bookingModalOpen =>
      dispatch(actions.toggleBookingModal(bookingModalOpen)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  Container,
);
