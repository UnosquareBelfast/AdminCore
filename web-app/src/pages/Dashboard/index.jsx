import React from 'react';
import Swal from 'sweetalert2';
import styles from './style.css';
import Calendar from 'react-calendar';
import Moment from 'moment';
import { getUserProfile } from '../../services/userService';
import { TakenLeave, BookedLeave, RequestHoliday } from '../../components';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: Moment(),
      daysRemaining: 0,
      requestModalOpen: false,
      user: null,
    };

    this.toggleHolidayModal = this.toggleHolidayModal.bind(this);
  }

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile() {
    getUserProfile()
      .then(response => {
        this.setState({ user: response.data });
        //eslint-disable-next-line
        console.log('Profile retrieved', response.data);
      })
      .catch(error => {
        Swal({
          title: 'Could not get user profile',
          text: error.message,
          type: 'error',
        });
      });
  }

  toggleHolidayModal() {
    this.setState({
      requestModalOpen: !this.state.requestModalOpen,
    });
  }

  render() {
    return (
      <div className={styles.RowC}>
        <div className={styles.LeaveTrackerList}>
          <span>Days Taken:</span>
          <TakenLeave user={this.props.user} />
          <br />
          <span>Days Booked:</span>
          <BookedLeave user={this.props.user} />
        </div>
        <div className={styles.CalendarDiv}>
          <span>Days Remaining: {this.state.daysRemaining}</span>

          <Calendar
            className={styles.CalendarStyling}
            onChangeMonth={date => this.setState({ date })}
            date={this.state.date}
            onPickDate={date => console.log(date)}
          />
          <br />
          <button onClick={this.toggleHolidayModal}>Book Holiday</button>
          <RequestHoliday
            user={this.props.user}
            show={this.state.requestModalOpen}
            onClose={this.toggleHolidayModal}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
