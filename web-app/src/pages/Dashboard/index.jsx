import React from 'react';
import styles from './style.css';
import Calendar from 'react-calendar';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { TakenLeave, BookedLeave, RequestHoliday, Leave } from '../../components';
import { Layout, withAuth } from '../../hoc';
import { flowRight } from 'lodash';

const Dashboard = props => {
  return (
    <Layout {...props}>
      <div className={styles.RowC}>
        <div className={styles.LeaveTrackerList}>

          <Leave user={ props.user } daysRemaining={  props.daysRemaining }/>

        </div>
        <div className={styles.CalendarDiv}>
      
          <Calendar
            className={styles.CalendarStyling}
            onChangeMonth={() => {}}
            date={props.date}
            onPickDate={() => {}}
          />
          <br />
          <button onClick={props.toggleHolidayModal}>Book Holiday</button>
          <RequestHoliday
            user={props.user}
            show={() => {}}
            onClose={() => {}}
          />
        </div>
      </div>
    </Layout>
  );
};

Dashboard.propTypes = {
  user: PT.object,
  daysRemaining: PT.number,
  toggleHolidayModal: PT.func,
  date: PT.object,
};

const enhance = flowRight(withAuth, container);
export default enhance(Dashboard);
