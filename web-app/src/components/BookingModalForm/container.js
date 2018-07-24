import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { updateHoliday, requestHoliday } from '../../services/holidayService';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.string.isRequired,
      updateTakenHolidays: PT.func.isRequired,
      updateBookingAndDuration: PT.func.isRequired,
      closeModal: PT.func.isRequired,
      booking: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        formData: {
          end: props.booking.end,
          eventStatusId: props.booking.eventStatusId,
          isHalfday: props.booking.isHalfday,
          start: props.booking.start,
        },
        formIsValid: true,
      };
    }

    handleMakeHolidayRequest = event => {
      event.preventDefault();
      const { start, end, isHalfday, eventStatusId } = this.state.formData;
      const dateFormat = 'YYYY-MM-DD';

      const request = {
        dates: [
          {
            startDate: start.format(dateFormat),
            endDate: end.format(dateFormat),
            halfDay: isHalfday,
          },
        ],
        eventStatusId: eventStatusId,
        employeeId: this.props.employeeId,
      };

      requestHoliday(request).then(() => {
        this.props.updateTakenHolidays(this.props.employeeId);
        this.props.closeModal();
      });
    };

    handleUpdateHolidayRequest = (event, cancel) => {
      event.preventDefault();
      const { start, end, isHalfday } = this.state.formData;
      const dateFormat = 'YYYY-MM-DD';

      const request = {
        startDate: start.format(dateFormat),
        endDate: end.format(dateFormat),
        halfDay: isHalfday,
        eventId: this.props.booking.id,
        eventStatusId: cancel ? 3 : 1,
        employeeId: this.props.employeeId,
      };

      updateHoliday(request).then(() => {
        this.props.updateTakenHolidays(this.props.employeeId);
        this.props.closeModal();
      });
    };

    handleFormStatus(name, value, formIsValid) {
      const formData = { ...this.state.formData };
      formData[name] = value;

      if (name == 'start' || name == 'end') {
        formData.isHalfday = false;
        if (formData.start.isAfter(formData.end)) {
          formData.end = formData.start;
        } else if (formData.end.isBefore(formData.start)) {
          formData.start = formData.end;
        }
      } else if (name === 'isHalfday' && formData.isHalfday) {
        formData.end = formData.start;
      } else if (name === 'eventTypeId' && value !== 1) {
        formData.isHalfday = false;
      }

      this.setState(
        {
          formData,
          formIsValid,
        },
        () => {
          this.updateBookingObj(formData);
        },
      );
    }

    updateBookingObj(formData) {
      const { isEventBeingUpdated } = this.props.booking;
      const updatedBooking = {
        ...this.props.booking,
        ...formData,
        isEventBeingUpdated: isEventBeingUpdated,
      };
      this.props.updateBookingAndDuration(updatedBooking);
    }

    render() {
      return (
        <Wrapped
          formData={this.state.formData}
          isEventBeingUpdated={this.props.booking.isEventBeingUpdated}
          formIsValid={this.state.formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          updateBookingAndDuration={this.props.updateBookingAndDuration}
          submitHolidayRequest={e => this.handleMakeHolidayRequest(e)}
          updateHolidayRequest={e => this.handleUpdateHolidayRequest(e, true)}
          deleteHolidayRequest={e => this.handleUpdateHolidayRequest(e, false)}
        />
      );
    }
  };
