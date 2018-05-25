import React from 'react';
import { PropTypes as PT } from 'prop-types';
import styles from './style.css';
import container from './container';

export const BookedLeave = (props) => {
  const formatDate = (date) => {
    const definedDate = new Date(date);
    const year = definedDate.getFullYear();
    const month = definedDate.toLocaleString('en-us', { month: 'long'});
    const day = definedDate.getDate();

    return year + '-' + month + '-' + day;
  };

  return (
    <div>
      {
        props.bookedHolidays.map(holiday => {
          return <span className={styles.LeaveTrackerList}>{formatDate(holiday.date)}</span>;
        })
      }
    </div>
  );
};

BookedLeave.propTypes = {
  bookedHolidays: PT.array,
};

export default container(BookedLeave);
