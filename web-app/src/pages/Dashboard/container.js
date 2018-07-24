import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import moment from 'moment';
import { getUserProfile } from '../../services/userService';
import { getAllHolidays } from '../../services/holidayService';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      user: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        booking: {
          duration: 0,
          end: moment(),
          eventType: 'Holiday',
          isEventBeingUpdated: false,
          isHalfday: false,
          isWFH: false,
          start: moment(),
        },
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

    getRandomItem = array => {
      return array[Math.floor(Math.random() * array.length)];
    };

    getTakenHolidays = () => {
      getAllHolidays()
        .then(response => {
          const usersHolidays = response.data;
          this.setState({
            takenHolidays: this.formatDates(usersHolidays),
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

    formatDates(events) {
      const eventsForCalendar = events.map(event => {
        return {
          ...event,
          allDay: !event.halfDay,
          eventStatusId: event.eventStatusId,
          id: event.eventId,
          isHalfday: event.halfDay,
          isWFH: false,
          title: `${event.employee.forename} ${event.employee.surname}`,
        };
      });
      return eventsForCalendar;
    }

    closeModal = () => {
      this.setState({ showModal: false });
    };

    updateBookingAndDuration = booking => {
      const { isHalfday, isWFH, start, end } = booking;
      booking.duration = 1;
      if (isHalfday) {
        booking.duration = 0.5;
      } else if (isWFH) {
        booking.duration = 0;
      } else {
        booking.duration = Math.floor(
          moment.duration(end.diff(start)).asDays() + 1,
        );
      }

      this.setState({
        booking: booking,
        showModal: true,
      });
    };

    onUpdateEvents = eventStatusId => {
      let updatedFilterEvents = this.state.filterEvents;
      if (updatedFilterEvents.includes(eventStatusId)) {
        updatedFilterEvents = updatedFilterEvents.filter(
          item => item !== eventStatusId,
        );
      } else {
        updatedFilterEvents.push(eventStatusId);
      }

      let takenHolidaysUpdated = null;
      if (updatedFilterEvents.length > 0) {
        takenHolidaysUpdated = this.state.takenHolidays.filter(hol =>
          updatedFilterEvents.includes(hol.eventStatusId),
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
            userDetails={this.state.userDetails}
            onUpdateEvents={this.onUpdateEvents}
          />
        )
      );
    }
  };

export default DashboardContainer;
