import React from 'react';
import { PropTypes as PT } from 'prop-types';
import styles from './style.css';
import container from './container';

export const TakenLeave = ({takenHolidays}) => {

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
        takenHolidays.length > 0 ?
          takenHolidays.map(holiday => {
            return <span className={styles.TextStyle}>
              {formatDate(holiday.date)}
            </span>;
          }) : <span className={styles.TextStyle}> 0 </span>

      }
    </div>
  );

};

TakenLeave.propTypes = {
  takenHolidays: PT.array,
};

export default container(TakenLeave);
