import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { HolidayList } from '../';

export const PendingHolidays = ({ pendingHolidays }) => {
  return (
    <Fragment>
      <h2>Manage Pending Holidays</h2>
      <HolidayList
        holidays={pendingHolidays}
        columns={['employee', 'startDate', 'endDate', 'requestedDate']}
        actions={['approve', 'reject']}
      />
    </Fragment>
  );
};

PendingHolidays.propTypes = {
  pendingHolidays: PT.array,
};

export default container(PendingHolidays);
