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
          isHalfday: false,
          isWFH: false,
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
          })
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

    getDuration(start, end) {
      return moment.duration(end.diff(start)).asDays() + 1;
    }

    onSelectSlot = ({ start, end }) => {
      this.setState({
        showModal: true,
        booking: {
          isHalfday: false,
          isWFH: false,
          start: moment(start),
          end: moment(end),
          duration: this.getDuration(moment(start), moment(end)),
        },
      });
    };

    onSelectEvent = booking => {
      this.setState({
        showModal: true,
        booking: {
          isHalfday: booking.halfDay,
          start: moment(booking.start),
          end: moment(booking.end),
          duration: this.getDuration(
            moment(booking.start),
            moment(booking.end)
          ),
          id: booking.id,
          title: booking.title,
          ...booking,
        },
      });
    };

    changeStart = value => {
      const booking = { ...this.state.booking };
      booking.start = value;
      if (value.isAfter(booking.end)) {
        booking.end = value;
      }
      booking.duration = this.getDuration(booking.start, booking.end);
      if (booking.duration > 1) {
        booking.isHalfday = false;
      }
      this.setState({ booking });
    };

    changeEnd = value => {
      const booking = { ...this.state.booking };
      booking.end = value;
      if (value.isBefore(booking.start)) {
        booking.start = value;
      }
      booking.duration = this.getDuration(booking.start, value);
      if (booking.duration > 1) {
        booking.isHalfday = false;
      }
      this.setState({ booking });
    };

    changeHalfday = e => {
      const booking = { ...this.state.booking };
      booking.isHalfday = e.target.checked;
      this.setState({ booking });
    };

    changeWFH = e => {
      const booking = { ...this.state.booking };
      booking.isWFH = e.target.checked;
      this.setState({ booking });
    };

    submitHolidayRequest = () => {
      const { booking, userDetails } = this.state;
      const { start, end, isHalfday } = booking;
      const dateFormat = 'YYYY-MM-DD';

      const request = {
        dates: [
          {
            startDate: start.format(dateFormat),
            endDate: end.format(dateFormat),
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
      const { start, end, isHalfday } = booking;
      const dateFormat = 'YYYY-MM-DD';

      const request = {
        dates: [
          {
            startDate: start.format(dateFormat),
            endDate: end.format(dateFormat),
            halfDay: isHalfday,
          },
        ],
        holidayId: booking.id,
        holidayStatusId: cancel ? 3 : 1,
        employeeId: userDetails.employeeId,
      };

      // const request = {
      //   date: booking.start.format('YYYY-MM-DD'),
      //   dateCreated: moment().format('YYYY-MM-DD'),
      //   halfDay: booking.isHalfday,
      //   holidayId: booking.id,
      //   holidayStatusDescription: 'Booked',
      //   holidayStatusId: cancel ? 3 : 1,
      //   lastModified: moment().format('YYYY-MM-DD'),
      //   employee: {
      //     employeeId: userDetails.employeeId,
      //     forename: userDetails.forename,
      //     surname: userDetails.surname,
      //     email: userDetails.email,
      //     totalHolidays: 33,
      //     startDate: [2014, 1, 1],
      //     countryId: 1,
      //     countryDescription: 'Northern Ireland',
      //     employeeRoleId: 2,
      //     employeeRoleDescription: 'System administrator',
      //     employeeStatusId: 2,
      //     statusDescription: 'Inactive',
      //   },
      // };
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
            onSelectSlot={this.onSelectSlot}
            onSelectEvent={this.onSelectEvent}
            closeModal={this.closeModal}
            changeStart={this.changeStart}
            changeEnd={this.changeEnd}
            changeHalfday={this.changeHalfday}
            userDetails={this.state.userDetails}
            requestHoliday={this.submitHolidayRequest}
            takenHolidays={this.state.takenHolidays}
            updateHoliday={() => this.updateHoliday(false)}
            cancelHoliday={() => this.updateHoliday(true)}
            changeWFH={this.changeWFH}
            {...this.state}
            {...this.props}
          />
        )
      );
    }
  };

export default DashboardContainer;
