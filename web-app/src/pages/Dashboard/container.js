import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import moment from 'moment';
import { getUserProfile } from '../../services/userService';
import {
  updateHoliday,
  requestHoliday,
  getHolidays,
} from '../../services/holidayService';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      user: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        date: moment(),
        takenHolidays: null,
        showModal: false,
        booking: {
          buttonLabel: 'Request',
          formData: {
            startDate: moment(),
            endDate: moment(),
            isHalfday: false,
            isWFH: false,
          },
          formIsValid: false,
          duration: 0,
        },
        requestModalOpen: false,
        userDetails: null,
      };
    }

    componentDidMount() {
      const userId = localStorage.getItem('user_id');
      getUserProfile(userId)
        .then(response => {
          this.setState({
            userDetails: response.data,
          });
          this.getTakenHolidays(userId);
        })
        .catch(error =>
          Swal({
            title: 'Could not get user profile',
            text: error.message,
            type: 'error',
          }),
        );
    }

    getTakenHolidays = userId => {
      getHolidays(userId)
        .then(response => {
          this.setState({
            takenHolidays: this.formatDates(response.data),
          });
        })
        .catch(error => {
          Swal({
            title: 'Could not get taken holidays',
            text: error.message,
            type: 'error',
          });
        });
    };

    formatDates(events) {
      var eventsForCalendar = events.map(hol => {
        return {
          id: hol.holidayId,
          title: `${hol.employee.forename} ${hol.employee.surname}`,
          allDay: !hol.halfDay,
          isHalfday: hol.halfDay,
          isWFH: false,
          ...hol,
          holidayStatusId: hol.holidayStatusId,
        };
      });
      return eventsForCalendar;
    }

    closeModal = () => {
      this.setState({ showModal: false });
    };

    getDuration({ isHalfday, isWFH, startDate, endDate }) {
      let duration = 1;
      if (isHalfday) {
        duration = 0.5;
      } else if (isWFH) {
        duration = 0;
      } else {
        duration = moment.duration(endDate.diff(startDate)).asDays() + 1;
      }
      return duration;
    }

    updateBookingFormOnSelect = (booking, buttonLabel) => {
      let updatedForm = {
        ...this.state.booking.formData,
      };
      updatedForm.startDate = moment(booking.start);
      updatedForm.endDate = moment(booking.end);
      updatedForm.isHalfday = booking.isHalfday;
      updatedForm.isWFH = booking.isWFH;

      this.setState({
        showModal: true,
        booking: {
          buttonLabel: buttonLabel,
          formData: updatedForm,
          duration: this.getDuration(updatedForm),
          id: booking.id,
          title: booking.title,
          ...booking,
        },
      });
    };

    onSelectSlot = ({ start, end }) => {
      let booking = {
        start: moment(start),
        end: moment(end),
        isHalfday: false,
        isWFH: false,
      };
      this.updateBookingFormOnSelect(booking, 'Request');
    };

    onSelectEvent = booking => {
      this.updateBookingFormOnSelect(booking, 'Update');
    };

    submitHolidayRequest = () => {
      const { booking, userDetails } = this.state;
      const { startDate, endDate, isHalfday } = booking.formData;
      const dateFormat = 'YYYY-MM-DD';

      const request = {
        dates: [
          {
            startDate: startDate.format(dateFormat),
            endDate: endDate.format(dateFormat),
            halfDay: isHalfday,
          },
        ],
        employeeId: userDetails.employeeId,
      };

      requestHoliday(request).then(() => {
        this.getTakenHolidays(userDetails.employeeId);
        this.closeModal();
      });
    };

    updateHoliday = cancel => {
      const { booking, userDetails } = this.state;
      const { startDate, endDate, isHalfday } = booking.formData;
      const dateFormat = 'YYYY-MM-DD';

      const request = {
        startDate: startDate.format(dateFormat),
        endDate: endDate.format(dateFormat),
        halfDay: isHalfday,
        holidayId: booking.id,
        holidayStatusId: cancel ? 3 : 1,
        employeeId: userDetails.employeeId,
      };

      updateHoliday(request).then(() => {
        this.getTakenHolidays(userDetails.employeeId);
        this.closeModal();
      });
    };

    handleFormStatus(name, value, formIsValid) {
      const formData = { ...this.state.booking.formData };
      formData[name] = value;

      if (name == 'startDate' || name == 'endDate') {
        formData.isHalfday = false;
        formData.isWFH = false;
      }

      if (name == 'startDate' && formData.startDate.isAfter(formData.endDate)) {
        formData.endDate = formData.startDate;
      } else if (
        name == 'endDate' &&
        formData.endDate.isBefore(formData.startDate)
      ) {
        formData.startDate = formData.endDate;
      } else if (name == 'isHalfday' && formData.isHalfday) {
        formData.isWFH = false;
        formData.endDate = formData.startDate;
      } else if (name == 'isWFH' && formData.isWFH) {
        formData.isHalfday = false;
        formData.endDate = formData.startDate;
      }

      this.setState({
        booking: {
          buttonLabel: this.state.booking.buttonLabel,
          formData,
          formIsValid,
          duration: this.getDuration(formData),
        },
      });
    }

    handleFormSubmit = event => {
      event.preventDefault();
      let buttonEvent = event.target.getAttribute('label');
      if (buttonEvent == 'Request') {
        this.submitHolidayRequest();
      } else if (buttonEvent == 'Update') {
        this.updateHoliday(true);
      } else if (buttonEvent == 'Cancel') {
        this.updateHoliday(false);
      }
    };

    render() {
      return (
        this.state.userDetails &&
        this.state.takenHolidays && (
          <Wrapped
            onSelectSlot={this.onSelectSlot}
            onSelectEvent={this.onSelectEvent}
            closeModal={this.closeModal}
            showModal={this.showModal}
            booking={this.state.booking}
            userDetails={this.state.userDetails}
            takenHolidays={this.state.takenHolidays}
            formStatus={(name, value, formIsValid) =>
              this.handleFormStatus(name, value, formIsValid)
            }
            submitForm={e => this.handleFormSubmit(e)}
            {...this.state}
            {...this.props}
          />
        )
      );
    }
  };

export default DashboardContainer;
