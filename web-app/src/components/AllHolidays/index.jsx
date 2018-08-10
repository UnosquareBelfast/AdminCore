import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { DataTable, HolidayModal } from '../';
import HolidayCells from '../DataTable/Cells/holidays';

export const AllHolidays = ({
  holidays,
  selectedHoliday,
  selectHoliday,
  closeModal,
}) => {
  return (
    <Fragment>
      <HolidayModal holiday={selectedHoliday} closeModal={() => closeModal()} />
      <h2>All Holidays</h2>
      <DataTable
        data={holidays}
        cells={HolidayCells}
        pageSize={20}
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
  closeModal: PT.func.isRequired,
};

export default container(AllHolidays);
