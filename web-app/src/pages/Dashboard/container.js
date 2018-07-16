import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import moment from 'moment';
import { getUserProfile } from '../../services/userService';
import { getHolidays } from '../../services/holidayService';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      user: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        takenHolidays: null,
        showModal: false,
        booking: {
          start: moment(),
          end: moment(),
          isHalfday: false,
          isWFH: false,
          isEventBeingUpdated: false,
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

    getDuration = booking => {
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
        showModal: true,
        booking: booking,
      });
    };

    onSelectSlot = ({ start, end }) => {
      let booking = {
        start: moment(start),
        end: moment(end),
        isHalfday: false,
        isWFH: false,
        isEventBeingUpdated: false,
      };
      this.getDuration(booking);
    };

    onSelectEvent = booking => {
      const updatedBooking = {
        ...booking,
        isEventBeingUpdated: true,
      };
      this.getDuration(updatedBooking);
    };

    render() {
      return (
        this.state.userDetails &&
        this.state.takenHolidays && (
          <Wrapped
            onSelectSlot={this.onSelectSlot}
            onSelectEvent={this.onSelectEvent}
            updateTakenHolidays={this.getTakenHolidays}
            closeModal={this.closeModal}
            showModal={this.showModal}
            booking={this.state.booking}
            userDetails={this.state.userDetails}
            takenHolidays={this.state.takenHolidays}
            getDuration={this.getDuration}
            {...this.state}
            {...this.props}
          />
        )
      );
    }
  };

export default DashboardContainer;
