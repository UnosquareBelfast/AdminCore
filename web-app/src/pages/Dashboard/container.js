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
  isFormValidOnChange,
  getFormElementsArray,
  updateFormDataOnChange,
  checkValidity,
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

    getDuration(start, end) {
      return moment.duration(end.diff(start)).asDays() + 1;
    }

    isDateInputValid = inputDate => {
      inputDate.valid = checkValidity(inputDate.value, inputDate.validation);
    };

    setDateInputElementOnSelect = (inputDate, value) => {
      inputDate.value = moment(value);
      if (!this.isDateInputValid(inputDate)) {
        inputDate.touched = true;
      }
      return inputDate;
    };

    updateBookingFormOnSelect = (start, end, isHalfday, isWFH) => {
      const updatedForm = {
        ...this.state.booking.form,
      };
      updatedForm.startDate = this.setDateInputElementOnSelect(
        updatedForm.startDate,
        start,
      );
      updatedForm.endDate = this.setDateInputElementOnSelect(
        updatedForm.endDate,
        end,
      );
      updatedForm.isHalfday.value = isHalfday;
      updatedForm.isWFH.value = isWFH;

      return updatedForm;
    };

    onSelectSlot = ({ start, end }) => {
      const updatedForm = this.updateBookingFormOnSelect(
        start,
        end,
        false,
        false,
      );
      const formIsValid = isFormValidOnChange(updatedForm);

      this.setState({
        showModal: true,
        booking: {
          form: updatedForm,
          formIsValid: formIsValid,
          duration: this.getDuration(moment(start), moment(end)),
        },
      });
    };

    onSelectEvent = booking => {
      const updatedForm = this.updateBookingFormOnSelect(
        booking.start,
        booking.end,
        booking.isHalfday,
        booking.isWFH,
      );

      const formIsValid = isFormValidOnChange(updatedForm);

      let duration;
      if (booking.isHalfday) {
        duration = 0.5;
      } else if (booking.isWFH) {
        duration = 0;
      } else {
        duration = this.getDuration(moment(booking.start), moment(booking.end));
      }

      this.setState({
        showModal: true,
        booking: {
          form: updatedForm,
          formIsValid: formIsValid,
          duration: duration,
          id: booking.id,
          title: booking.title,
          ...booking,
        },
      });
    };

    changeStart = value => {
      const updatedForm = updateFormDataOnChange(
        this.state.booking.form,
        'startDate',
        value,
      );
      let { startDate } = updatedForm;
      let { endDate } = this.state.booking.form;
      if (startDate.value.isAfter(endDate.value)) {
        updatedForm.endDate = this.setDateInputElementOnSelect(
          updatedForm.endDate,
          startDate.value,
        );
      }
      let duration = this.getDuration(startDate.value, endDate.value);
      if (duration > 1) {
        updatedForm.isHalfday.value = false;
        updatedForm.isWFH.value = false;
      }
      let formIsValid = isFormValidOnChange(updatedForm);

      this.setState({
        booking: {
          form: updatedForm,
          formIsValid: formIsValid,
          duration: duration,
        },
      });
    };

    changeEnd = value => {
      const updatedForm = updateFormDataOnChange(
        this.state.booking.form,
        'endDate',
        value,
      );
      let { startDate } = this.state.booking.form;
      let { endDate } = updatedForm;
      if (endDate.value.isBefore(startDate.value)) {
        updatedForm.startDate = this.setDateInputElementOnSelect(
          updatedForm.startDate,
          endDate.value,
        );
      }
      let duration = this.getDuration(startDate.value, endDate.value);
      if (duration > 1) {
        updatedForm.isHalfday.value = false;
        updatedForm.isWFH.value = false;
      }
      let formIsValid = isFormValidOnChange(updatedForm);

      this.setState({
        booking: {
          form: updatedForm,
          formIsValid: formIsValid,
          duration: duration,
        },
      });
    };

    changeHalfday = checked => {
      const updatedForm = updateFormDataOnChange(
        this.state.booking.form,
        'isHalfday',
        checked,
      );

      let duration = null;
      if (checked) {
        updatedForm.isWFH.value = false;
        updatedForm.endDate.value = updatedForm.startDate.value;
        duration = 0.5;
      } else {
        duration = 1;
      }

      let formIsValid = isFormValidOnChange(updatedForm);

      this.setState({
        booking: {
          form: updatedForm,
          formIsValid: formIsValid,
          duration: duration,
        },
      });
    };

    changeWFH = checked => {
      const updatedForm = updateFormDataOnChange(
        this.state.booking.form,
        'isWFH',
        checked,
      );

      let duration;
      if (checked) {
        updatedForm.isHalfday.value = false;
        duration = 0;
        updatedForm.endDate.value = updatedForm.startDate.value;
      } else {
        duration = 1;
      }

      let formIsValid = isFormValidOnChange(updatedForm);

      this.setState({
        booking: {
          form: updatedForm,
          formIsValid: formIsValid,
          duration: duration,
        },
      });
    };

    handleFormChange = (event, inputIdentifier) => {
      if (inputIdentifier == 'startDate') {
        this.changeStart(event, inputIdentifier);
      } else if (inputIdentifier == 'endDate') {
        this.changeEnd(event, inputIdentifier);
      } else if (inputIdentifier == 'isHalfday') {
        this.changeHalfday(event.target.checked, inputIdentifier);
      } else if (inputIdentifier == 'isWFH') {
        this.changeWFH(event.target.checked, inputIdentifier);
      }
    };

    submitHolidayRequest = e => {
      e.preventDefault();
      const { booking, userDetails } = this.state;
      const formData = getFormDataOnSubmit(booking.form);
      const { startDate, endDate, isHalfday } = formData;
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
      const formData = getFormDataOnSubmit(booking.form);
      const { startDate, isHalfday } = formData;

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
