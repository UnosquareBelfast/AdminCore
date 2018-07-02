import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { HolidayList } from '../';

export const AllHolidays = ({ holidays }) => {
  return (
    <Fragment>
      <h2>All Holidays</h2>
      <HolidayList
        holidays={holidays}
        columns={[
          'status',
          'employee',
          'startDate',
          'endDate',
          'requestedDate',
        ]}
      />
    </Fragment>
  );
};

AllHolidays.propTypes = {
  holidays: PT.array,
};

export default container(AllHolidays);
