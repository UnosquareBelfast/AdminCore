import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Card } from '../common/';

export const Leave = (props) => {

  return (
    <Card>
      <strong>Leave Card</strong>
      <div>Days remaining: { props.totalHolidays - props.takenHolidays.length}</div>
      <div>Days Taken: { props.takenHolidays.length }</div>
    </Card>
  );
};

Leave.propTypes = {
  totalHolidays: PT.number,
  takenHolidays: PT.array,
};

export default container(Leave);
