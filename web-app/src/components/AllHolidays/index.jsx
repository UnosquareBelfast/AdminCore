import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { HolidayList, HolidayModal } from '../';

export const AllHolidays = ({ holidays, selectedHoliday, selectHoliday }) => {
  return (
    <Fragment>
      <HolidayModal
        holiday={selectedHoliday}
        closeModal={() => selectHoliday({})}
      />
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
        onRowClick={holiday => selectHoliday(holiday)}
      />
    </Fragment>
  );
};

AllHolidays.propTypes = {
  holidays: PT.array.isRequired,
  selectedHoliday: PT.object.isRequired,
  selectHoliday: PT.func.isRequired,
};

export default container(AllHolidays);
