import React from 'react';
import styles from './style.css';
import container from './container';

const TakenLeave = (props) => {

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
              props.takenHolidays.map(holiday => {
                  return <span className={styles.TextStyle}>
                      {formatDate(holiday.date)}
                  </span>
              })
          }
      </div>
    );

  }
export default container(TakenLeave);
