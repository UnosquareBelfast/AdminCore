import React from 'react';
import styles from './style.css'
import { PropTypes as PT } from 'prop-types';
import container from './container'

export const Leave = (props) => {

  return (
    <div className={ styles.Leave } >
      <strong>Leave Card</strong>

      <div>Days remaining: { props.daysRemaining - props.takenHolidays.length}</div>
      <div>Days Taken: { props.takenHolidays.length }</div>

    </div>
  );
};

Leave.propTypes = {
  daysRemaining: PT.number,
  takenHolidays: PT.array
};

export default container(Leave);
