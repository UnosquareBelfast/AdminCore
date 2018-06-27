import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Card } from '../common';
import { HolidayList } from '../';

export const PendingHolidays = ({pendingHolidays}) => {
  return (
    <Card>
      <h3>Manage Pending Holidays</h3>
      <HolidayList
        holidays={pendingHolidays}
        columns={['employee', 'startDate', 'endDate', 'requestedDate']}
        actions={['approve', 'reject']}
      />
    </Card>
  );
};

PendingHolidays.propTypes = {
  pendingHolidays: PT.array,
};

export default container(PendingHolidays);
