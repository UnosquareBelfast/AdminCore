import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { HolidayList, HolidayModal } from '../';

export const PendingHolidays = ({
  pendingHolidays,
  selectedHoliday,
  selectHoliday,
}) => {
  return (
    <Fragment>
      <HolidayModal
        holiday={selectedHoliday}
        closeModal={() => selectHoliday({})}
      />
      <h2>Manage Pending Holidays</h2>
      <HolidayList
        holidays={pendingHolidays}
        columns={[
          'status',
          'employee',
          'startDate',
          'endDate',
          'requestedDate',
        ]}
        actions={['approve', 'reject']}
        onRowClick={holiday => selectHoliday(holiday)}
      />
    </Fragment>
  );
};

PendingHolidays.propTypes = {
  pendingHolidays: PT.array.isRequired,
  selectedHoliday: PT.object,
  selectHoliday: PT.func.isRequired,
};

export default container(PendingHolidays);
