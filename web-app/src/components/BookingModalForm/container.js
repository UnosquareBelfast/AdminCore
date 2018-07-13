import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { updateHoliday, requestHoliday } from '../../services/holidayService';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.string,
      updateTakenHolidays: PT.func,
      getDuration: PT.func,
      closeModal: PT.func,
      booking: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        formData: {
          start: props.booking.start,
          end: props.booking.end,
          isHalfday: props.booking.isHalfday,
          isWFH: props.booking.isWFH,
        },
        formIsValid: true,
      };
    }

    handleMakeHolidayRequest = event => {
      event.preventDefault();
      const { start, end, isHalfday } = this.state.formData;
      const dateFormat = 'YYYY-MM-DD';

      const request = {
        dates: [
          {
            startDate: start.format(dateFormat),
            endDate: end.format(dateFormat),
            halfDay: isHalfday,
          },
        ],
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
        holidayId: this.props.booking.id,
        holidayStatusId: cancel ? 3 : 1,
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

      if (name == 'start') {
        if (formData.isHalfday || formData.isWFH) {
          formData.end = formData.start;
        } else {
          formData.isHalfday = false;
          formData.isWFH = false;
          if (formData.start.isAfter(formData.end)) {
            formData.end = formData.start;
          }
        }
      } else if (name == 'end') {
        formData.isHalfday = false;
        formData.isWFH = false;
        if (formData.end.isBefore(formData.start)) {
          formData.start = formData.end;
        }
      } else if (name === 'isHalfday' && formData.isHalfday) {
        formData.isWFH = false;
        formData.end = formData.start;
      } else if (name === 'isWFH' && formData.isWFH) {
        formData.isHalfday = false;
        formData.end = formData.start;
      }

      this.setState(
        {
          formData,
          formIsValid,
        },
        () => {
          this.updateDuration(formData);
        },
      );
    }

    updateDuration(formData) {
      const { isEventBeingUpdated } = this.props.booking;
      const updatedBooking = {
        ...this.props.booking,
        ...formData,
        isEventBeingUpdated: isEventBeingUpdated,
      };
      this.props.getDuration(updatedBooking);
    }

    render() {
      return (
        <Wrapped
          formData={this.state.formData}
          isEventBeingUpdated={this.props.booking.isEventBeingUpdated}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          getDuration={this.props.getDuration}
          submitHolidayRequest={e => this.handleMakeHolidayRequest(e)}
          updateHolidayRequest={e => this.handleUpdateHolidayRequest(e, true)}
          deleteHolidayRequest={e => this.handleUpdateHolidayRequest(e, false)}
        />
      );
    }
  };
