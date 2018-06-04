import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import moment from 'moment';
import { getUserProfile } from '../../services/userService';
import { requestHoliday, getHolidays } from '../../services/holidayService';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      user: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        date: moment(),
        totalHolidays: 0,
        takenHolidays: null,
        user: null,
        showModal: false,
        booking: {
          isHalfday: false,
        },
        requestModalOpen: false,
        userDetails: null,
      };
    }

    componentDidMount() {
      getUserProfile()
        .then(response => {
          this.setState({ userDetails: response.data[0], totalHolidays: response.data[0].totalHolidays });
          //eslint-disable-next-line
          console.log('Profile retrieved', response.data[0]);

          this.getTakenHolidays();
        })
        .catch(error => {
          Swal({
            title: 'Could not get user profile',
            text: error.message,
            type: 'error',
          });
        });
    }

    getTakenHolidays = () => {
      getHolidays(this.props.user.userId())
        .then(response => {
            this.setState({
               takenHolidays : this.formatDates(response.data) 
            });
        })
        .catch(error => {
          Swal({
            title: 'Could not get taken holidays',
            text: error.message,
            type: 'error',
          });
        });
    }

    formatDates(events){
        var eventsForCalendar = events.map(hol => {
          return {
           id: hol.holidayId,
           title: `${hol.employee.forename} - Annual Leave`,
           allDay: !hol.halfDay,
           start: new moment(hol.date, "YYYY-MM-DD"),
           end: new moment(hol.date, "YYYY-MM-DD")
         }
      });

      return eventsForCalendar
    }


    closeModal = () => { this.setState({showModal: false}); }

    getDuration(start, end) {
      return moment.duration(end.diff(start)).asDays() + 1;
    }

    onSelectSlot = ({start, end}) => {
      this.setState({
        showModal: true,
        booking: {
          isHalfday: false,
          start: moment(start),
          end: moment(end),
          duration: this.getDuration(moment(start), moment(end)),
        },
      });
    }

    onSelectEvent = ({start, end, id, title}) => {
      this.setState({
        showModal: true,
        booking: {
          isHalfday: false,
          start: moment(start),
          end: moment(end),
          duration: this.getDuration(moment(start), moment(end)),
          id: id,
          title: title,
        },
      });
    }

    changeStart = (value) => {
      const booking = {...this.state.booking};
      booking.start = value;
      if (value.isAfter(booking.end)) { booking.end = value; }
      booking.duration = this.getDuration(booking.start, booking.end);
      if (booking.duration > 1) { booking.isHalfday = false; }
      this.setState({booking});
    }

    changeEnd = (value) => {
      const booking = {...this.state.booking};
      booking.end = value;
      if (value.isBefore(booking.start)) { booking.start = value; }
      booking.duration = this.getDuration(booking.start, value);
      if (booking.duration > 1) { booking.isHalfday = false; }
      this.setState({booking});
    }

    changeHalfday = (e) => {
      const booking = {...this.state.booking};
      booking.isHalfday = e.target.checked;
      this.setState({booking});
    }

    requestHoliday = () => {
      console.log('Holiday requested');
      console.log('Starting', this.state.booking.start.format('Do MMMM YYYY'));
      console.log('Finishing', this.state.booking.end.format('Do MMMM YYYY'));
      console.log('Total', this.state.booking.duration, 'days');
    }

    render() {
      return (
        (this.state.userDetails && this.state.takenHolidays) &&
        <Wrapped
          onSelectSlot={this.onSelectSlot}
          onSelectEvent={this.onSelectEvent}
          closeModal={this.closeModal}
          changeStart={this.changeStart}
          changeEnd={this.changeEnd}
          changeHalfday={this.changeHalfday}
          userDetails={this.state.userDetails}
          requestHoliday={this.requestHoliday}
          takenHolidays={this.state.takenHolidays}
          {...this.state}
          {...this.props}
        />
      );
    }
  };

export default DashboardContainer;
