import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { BookingCalendar, BookingModal, Legend } from '../../components';
import { InnerLayout } from './styled';

export const Dashboard = props => {
  const {
    loading,
    takenHolidays,
    takenHolidaysFiltered,
    updateTakenHolidays,
    employeeId,
    onUpdateEvents,
    onUpdateEmployee,
    isEventBeingUpdated,
  } = props;

  let events;
  if (!loading) {
    events = (
      <InnerLayout>
        <BookingCalendar
          employeeId={employeeId}
          takenHolidays={takenHolidaysFiltered}
          isEventBeingUpdated={isEventBeingUpdated}
        />
        <Legend
          updateCalendarEvents={onUpdateEvents}
          updateEmployee={onUpdateEmployee}
          takenHolidays={takenHolidays}
        />
      </InnerLayout>
    );
  } else {
    events = null;
  }

  return (
    <Fragment>
      <BookingModal
        employeeId={employeeId}
        updateTakenHolidays={updateTakenHolidays}
        isEventBeingUpdated={isEventBeingUpdated}
      />
      {events}
    </Fragment>
  );
};

Dashboard.propTypes = {
  onUpdateEvents: PT.func.isRequired,
  onUpdateEmployee: PT.func.isRequired,
  loading: PT.bool,
  takenHolidays: PT.array,
  takenHolidaysFiltered: PT.array,
  updateTakenHolidays: PT.func.isRequired,
  employeeId: PT.number,
  isEventBeingUpdated: PT.bool,
};

Dashboard.defaultProps = {
  bookingModalOpen: false,
};

export default container(Dashboard);
