import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { BookingCalendar, BookingModal, Legend } from '../../components';
import { InnerLayout } from './styled';

export const Dashboard = props => {
  const {
    takenHolidays,
    holidays,
    updateTakenHolidays,
    employeeId,
    onUpdateEvents,
    onUpdateEmployee,
    isEventBeingUpdated,
  } = props;

  return (
    <Fragment>
      <BookingModal
        employeeId={employeeId}
        updateTakenHolidays={updateTakenHolidays}
        isEventBeingUpdated={isEventBeingUpdated}
      />
      <InnerLayout>
        <BookingCalendar
          employeeId={employeeId}
          takenHolidays={holidays}
          isEventBeingUpdated={isEventBeingUpdated}
        />
        <Legend
          updateCalendarEvents={onUpdateEvents}
          updateEmployee={onUpdateEmployee}
          takenHolidays={takenHolidays}
        />
      </InnerLayout>
    </Fragment>
  );
};

Dashboard.propTypes = {
  onUpdateEvents: PT.func.isRequired,
  onUpdateEmployee: PT.func.isRequired,
  takenHolidays: PT.array,
  holidays: PT.array,
  updateTakenHolidays: PT.func.isRequired,
  employeeId: PT.number,
  isEventBeingUpdated: PT.bool,
};

Dashboard.defaultProps = {
  bookingModalOpen: false,
};

export default container(Dashboard);
