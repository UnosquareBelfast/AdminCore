import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { BookingCalendar, BookingModal, Legend } from '../../components';
import { InnerLayout } from './styled';

export const Dashboard = props => {
  const {
    allEvents,
    filteredEvents,
    updateTakenEvents,
    employeeId,
    onUpdateEvents,
    onUpdateEmployee,
    isEventBeingUpdated,
    onCalendarNavigate,
  } = props;

  return (
    <Fragment>
      <BookingModal
        employeeId={employeeId}
        updateTakenEvents={updateTakenEvents}
        isEventBeingUpdated={isEventBeingUpdated}
      />
      <InnerLayout>
        <BookingCalendar
          employeeId={employeeId}
          events={filteredEvents}
          isEventBeingUpdated={isEventBeingUpdated}
          onNavigate={onCalendarNavigate}
        />
        <Legend
          updateCalendarEvents={onUpdateEvents}
          updateEmployee={onUpdateEmployee}
          allEvents={allEvents}
        />
      </InnerLayout>
    </Fragment>
  );
};

Dashboard.propTypes = {
  onUpdateEvents: PT.func.isRequired,
  onUpdateEmployee: PT.func.isRequired,
  allEvents: PT.array,
  filteredEvents: PT.array,
  updateTakenEvents: PT.func.isRequired,
  employeeId: PT.number,
  isEventBeingUpdated: PT.bool,
  onCalendarNavigate: PT.func.isRequired,
};

Dashboard.defaultProps = {
  bookingModalOpen: false,
};

export default container(Dashboard);
