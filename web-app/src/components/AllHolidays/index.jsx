import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Card } from '../common';
import { HolidayList } from '../';

export const AllHolidays = ({ holidays }) => {
  return (
    <Card>
      <h3>All Holidays</h3>
      <HolidayList 
        holidays={holidays}
        columns={['status', 'employee', 'startDate', 'endDate', 'requestedDate']}
      />
    </Card>
  );
};

AllHolidays.propTypes = {
  holidays: PT.array,
};

export default container(AllHolidays);
