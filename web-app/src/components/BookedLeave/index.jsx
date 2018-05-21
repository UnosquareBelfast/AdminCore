import React from 'react';
import styles from './style.css';
import container from './container';

const BookedLeave = (props) => {
    const formatDate = (date) => {
        const definedDate = new Date(date);
        const year = definedDate.getFullYear();
        const month = definedDate.toLocaleString("en-us", { month: "long"});
        const day = definedDate.getDate();

        return year + '-' + month + '-' + day;
    }

      return (
        <div>
            {
                props.bookedHolidays.map(holiday => {
                    return <span className={styles.LeaveTrackerList}>{this.formatDate(holiday.date)}</span>
                })
            }
        </div>
      );
  };

  export default container(BookedLeave);
