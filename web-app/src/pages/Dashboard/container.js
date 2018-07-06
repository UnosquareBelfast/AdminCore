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
import {
  getFormElementsArray,
  updateFormDataOnChange,
  isFormValidOnChange,
  getFormDataOnSubmit,
} from '../../utilities/forms';

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
          form: this.initialFormState(),
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

    initialFormState() {
      return {
        startDate: {
          label: 'Start Date:',
          elementType: 'date',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter a start date',
          },
          value: moment(),
          validation: {
            dateNotInPast: true,
            dateNotGreaterThenEndDate: true,
          },
          valid: true,
        },
        endDate: {
          label: 'End Date:',
          elementType: 'date',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter an end date',
          },
          value: moment(),
          validation: {
            dateNotInPast: true,
          },
          valid: true,
        },
        isHalfday: {
          label: 'Halfday',
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox',
          },
          value: false,
          validation: {},
          valid: true,
        },
        isWFH: {
          label: 'Working from home',
          elementType: 'checkbox',
          elementConfig: {
            type: 'checkbox',
          },
          value: false,
          validation: {},
          valid: true,
        },
      };
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
      if (isHalfday.value) {
        duration = 0.5;
      } else if (isWFH.value) {
        duration = 0;
      } else {
        duration =
          moment.duration(endDate.value.diff(startDate.value)).asDays() + 1;
      }
      return duration;
    }

    updateBookingFormOnSelect = (start, end, isHalfday, isWFH) => {
      let updatedForm = {
        ...this.state.booking.form,
      };
      updatedForm = updateFormDataOnChange(updatedForm, 'startDate', start);
      updatedForm = updateFormDataOnChange(updatedForm, 'endDate', end);
      updatedForm.isHalfday.value = isHalfday;
      updatedForm.isWFH.value = isWFH;

      return updatedForm;
    };

    onSelectSlot = ({ start, end }) => {
      const updatedForm = this.updateBookingFormOnSelect(
        moment(start),
        moment(end),
        false,
        false,
      );

      this.setState({
        showModal: true,
        booking: {
          form: updatedForm,
          formIsValid: isFormValidOnChange(updatedForm),
          duration: this.getDuration(updatedForm),
        },
      });
    };

    onSelectEvent = booking => {
      const updatedForm = this.updateBookingFormOnSelect(
        moment(booking.start),
        moment(booking.end),
        booking.isHalfday,
        booking.isWFH,
      );

      this.setState({
        showModal: true,
        booking: {
          form: updatedForm,
          formIsValid: isFormValidOnChange(updatedForm),
          duration: this.getDuration(updatedForm),
          id: booking.id,
          title: booking.title,
          ...booking,
        },
      });
    };

    handleFormChange = (event, inputIdentifier) => {
      let value = event.target == undefined ? event : event.target.checked;
      let updatedForm = updateFormDataOnChange(
        this.state.booking.form,
        inputIdentifier,
        value,
      );
      let { startDate, endDate, isHalfday, isWFH } = updatedForm;

      if (
        inputIdentifier == 'startDate' &&
        startDate.value.isAfter(endDate.value)
      ) {
        updatedForm = updateFormDataOnChange(
          updatedForm,
          'endDate',
          startDate.value,
        );
      } else if (
        inputIdentifier == 'endDate' &&
        endDate.value.isBefore(startDate.value)
      ) {
        updatedForm = updateFormDataOnChange(
          updatedForm,
          'startDate',
          endDate.value,
        );
      } else if (inputIdentifier == 'isHalfday' && isHalfday.value) {
        updatedForm.isWFH.value = false;
        updatedForm = updateFormDataOnChange(
          updatedForm,
          'endDate',
          startDate.value,
        );
      } else if (inputIdentifier == 'isWFH' && isWFH.value) {
        isHalfday.value = false;
        updatedForm = updateFormDataOnChange(
          updatedForm,
          'endDate',
          startDate.value,
        );
      }

      this.setState({
        booking: {
          form: updatedForm,
          formIsValid: isFormValidOnChange(updatedForm),
          duration: this.getDuration(updatedForm),
        },
      });
    };

    submitHolidayRequest = e => {
      e.preventDefault();
      const { booking, userDetails } = this.state;
      const { startDate, endDate, isHalfday } = getFormDataOnSubmit(
        booking.form,
      );
      const request = [];

      for (let i = 0; i <= endDate.diff(startDate, 'days'); i++) {
        const start = startDate.clone();
        request.push({
          date: start.add(i, 'days').format('YYYY-MM-DD'),
          dateCreated: moment().format('YYYY-MM-DD'),
          halfDay: isHalfday,
          holidayId: 0,
          holidayStatusDescription: 'Booked',
          holidayStatusId: 1,
          lastModified: moment().format('YYYY-MM-DD'),
          employee: {
            employeeId: userDetails.employeeId,
            forename: userDetails.forename,
            surname: userDetails.surname,
            email: userDetails.email,
            totalHolidays: 33,
            startDate: [2014, 1, 1],
            countryId: 1,
            countryDescription: 'Northern Ireland',
            employeeRoleId: 2,
            employeeRoleDescription: 'System administrator',
            employeeStatusId: 2,
            statusDescription: 'Inactive',
          },
        });
      }

      requestHoliday(request).then(() => {
        this.getTakenHolidays(userDetails.employeeId);
        this.closeModal();
      });
    };

    updateHoliday = cancel => {
      const { booking, userDetails } = this.state;
      const { startDate, isHalfday } = getFormDataOnSubmit(booking.form);

      const request = {
        date: startDate.format('YYYY-MM-DD'),
        dateCreated: moment().format('YYYY-MM-DD'),
        halfDay: isHalfday,
        holidayId: booking.id,
        holidayStatusDescription: 'Booked',
        holidayStatusId: cancel ? 3 : 1,
        lastModified: moment().format('YYYY-MM-DD'),
        employee: {
          employeeId: userDetails.employeeId,
          forename: userDetails.forename,
          surname: userDetails.surname,
          email: userDetails.email,
          totalHolidays: 33,
          startDate: [2014, 1, 1],
          countryId: 1,
          countryDescription: 'Northern Ireland',
          employeeRoleId: 2,
          employeeRoleDescription: 'System administrator',
          employeeStatusId: 2,
          statusDescription: 'Inactive',
        },
      };
      updateHoliday(request).then(() => {
        this.getTakenHolidays(userDetails.employeeId);
        this.closeModal();
      });
    };

    render() {
      return (
        this.state.userDetails &&
        this.state.takenHolidays && (
          <Wrapped
            formElementsArray={getFormElementsArray(this.state.booking.form)}
            onSelectSlot={this.onSelectSlot}
            onSelectEvent={this.onSelectEvent}
            closeModal={this.closeModal}
            formChanged={(event, id) => this.handleFormChange(event, id)}
            userDetails={this.state.userDetails}
            requestHoliday={this.submitHolidayRequest}
            takenHolidays={this.state.takenHolidays}
            updateHoliday={() => this.updateHoliday(false)}
            cancelHoliday={() => this.updateHoliday(true)}
            {...this.state}
            {...this.props}
          />
        )
      );
    }
  };

export default DashboardContainer;
