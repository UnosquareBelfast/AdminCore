import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container'

import { Card } from '../styled'

export const Leave = (props) => {

  const {totalHolidays, takenHolidays} = props

  return (
    <Card>
      <strong>Leave Card</strong>

      <div><span>Days remaining: { totalHolidays - takenHolidays.length }</span></div>
      <div><span>Days Taken: { takenHolidays.length }</span></div>

    </Card>
  );
};

Leave.propTypes = {
  totalHolidays: PT.number,
  takenHolidays: PT.array
};

export default container(Leave);
