import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { DataTable, HolidayModal } from '../';
import HolidayCells from '../DataTable/Cells/holidays';

export const PendingHolidays = ({
  pendingHolidays,
  selectedHoliday,
  selectHoliday,
  closeModal,
}) => {
  return (
    <Fragment>
      <HolidayModal
        holiday={selectedHoliday}
        closeModal={() => closeModal()}
        showAdminControls
      />
      <h2>Manage Pending Holidays</h2>
      <DataTable
        data={pendingHolidays}
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

PendingHolidays.propTypes = {
  pendingHolidays: PT.array.isRequired,
  selectedHoliday: PT.object,
  selectHoliday: PT.func.isRequired,
  closeModal: PT.func.isRequired,
};

export default container(PendingHolidays);
