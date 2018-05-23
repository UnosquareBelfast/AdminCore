import React from 'react';
import styles from './style.css';
import Calendar from 'react-calendar';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { TakenLeave, BookedLeave, RequestHoliday } from '../../components';

const Dashboard = (props) => {
  return (
    <div className={styles.RowC}>
      <div className={styles.LeaveTrackerList}>
        <span>Days Taken:</span>
        <TakenLeave user={props.user} />
        <br />
        <span>Days Booked:</span>
        <BookedLeave user={props.user} />
      </div>
      <div className={styles.CalendarDiv}>
        <span>Days Remaining: {props.daysRemaining}</span>

        <Calendar
          className={styles.CalendarStyling}
          onChangeMonth={date => this.setState({ date })}
          date={this.state.date}
          onPickDate={date => console.log(date)}
        />
        <br />
        <button onClick={this.toggleHolidayModal}>Book Holiday</button>
        <RequestHoliday
          user={props.user}
          show={this.state.requestModalOpen}
          onClose={props.toggleHolidayModal}
        />
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  user: PT.user,
  daysRemaining: PT.object,
  toggleHolidayModal: PT.function
};

export default container(Dashboard);