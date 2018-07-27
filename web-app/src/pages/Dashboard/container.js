import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import moment from 'moment';
import { getUserProfile } from '../../services/userService';
import { getAllHolidays, getHolidays } from '../../services/holidayService';
import { getDurationNotice } from '../../utilities/dates';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      user: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        booking: {},
        requestModalOpen: false,
        showModal: false,
        takenHolidays: null,
        takenHolidaysFiltered: null,
        filterEvents: [],
        userDetails: null,
      };
    }

    componentDidMount() {
      const userId = localStorage.getItem('user_id');
      getUserProfile(userId)
        .then(response => {
          this.setState(
            {
              userDetails: response.data,
            },
            () => {
              this.getTakenHolidays();
            },
          );
        })
        .catch(error =>
          Swal({
            text: error.message,
            title: 'Could not get user profile',
            type: 'error',
          }),
        );
    }

    createBookingObj = event => {
      const startDate = moment(event.startDate, 'YYYY-MM-DD');
      const endDate = moment(event.endDate, 'YYYY-MM-DD');

      return {
        holidayId: event.holidayId,
        title: `${event.employee.forename} ${event.employee.surname}`,
        duration: getDurationNotice(startDate, endDate),
        allDay: !event.halfDay,
        start: startDate,
        end: endDate,
        halfDay: event.halfDay,
        employee: event.employee,
        eventStatus: event.eventStatus,
        eventType: event.eventType,
      };
    };

    getTakenHolidays = () => {
      getAllHolidays()
        .then(response => {
          const eventsForCalendar = response.data.map(event => {
            return this.createBookingObj(event);
          });
          this.setState({
            takenHolidays: eventsForCalendar,
          });
        })
        .catch(error => {
          Swal({
            text: error.message,
            title: 'Could not get taken holidays',
            type: 'error',
          });
        });
    };

    getTakenHolidaysById = id => {
      if (id === -1) {
        this.getTakenHolidays();
      } else {
        getHolidays(id)
          .then(response => {
            const eventsForCalendar = response.data.map(event => {
              return this.createBookingObj(event);
            });
            this.setState(
              {
                takenHolidays: eventsForCalendar,
              },
              () => this.onFilterEvents(),
            );
          })
          .catch(error => {
            Swal({
              text: error.message,
              title: 'Could not get taken holidays',
              type: 'error',
            });
          });
      }
    };

    closeModal = () => {
      this.setState({ showModal: false });
    };

    updateBookingAndDuration = booking => {
      const { isHalfday, eventType, start, end } = booking;
      booking.duration = 1;
      if (isHalfday) {
        booking.duration = 0.5;
      } else if (eventType.eventTypeId !== 1) {
        booking.duration = 0;
      } else {
        booking.duration = getDurationNotice(start, end);
      }

      this.setState({
        booking: booking,
        showModal: true,
      });
    };

    onFilterEmployee = employee => {
      this.getTakenHolidaysById(employee.employeeId);
    };

    onFilterEvents = eventStatusId => {
      let updatedFilterEvents = [...this.state.filterEvents];
      if (eventStatusId !== undefined) {
        if (updatedFilterEvents.includes(eventStatusId)) {
          updatedFilterEvents = updatedFilterEvents.filter(
            item => item !== eventStatusId,
          );
        } else {
          updatedFilterEvents.push(eventStatusId);
        }
      }

      let takenHolidaysUpdated = null;
      if (updatedFilterEvents.length > 0) {
        takenHolidaysUpdated = this.state.takenHolidays.filter(hol =>
          updatedFilterEvents.includes(hol.eventStatus.eventStatusId),
        );
      }

      this.setState({
        filterEvents: updatedFilterEvents,
        takenHolidaysFiltered: takenHolidaysUpdated,
      });
    };

    render() {
      return (
        this.state.userDetails &&
        this.state.takenHolidays && (
          <Wrapped
            booking={this.state.booking}
            closeModal={this.closeModal}
            updateBookingAndDuration={this.updateBookingAndDuration}
            showModal={this.state.showModal}
            takenHolidays={
              this.state.takenHolidaysFiltered === null
                ? this.state.takenHolidays
                : this.state.takenHolidaysFiltered
            }
            updateTakenHolidays={this.getTakenHolidays}
            employeeId={this.state.userDetails.employeeId}
            onUpdateEvents={this.onFilterEvents}
            onUpdateEmployee={this.onFilterEmployee}
          />
        )
      );
    }
  };

export default DashboardContainer;
