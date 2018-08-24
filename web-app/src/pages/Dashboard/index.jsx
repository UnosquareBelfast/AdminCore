import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { BookingCalendar, BookingModal, Legend } from '../../components';
import { InnerLayout } from './styled';

export const Dashboard = props => {
  const {
    takenEvents,
    events,
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
          events={events}
          isEventBeingUpdated={isEventBeingUpdated}
          onNavigate={onCalendarNavigate}
        />
        <Legend
          updateCalendarEvents={onUpdateEvents}
          updateEmployee={onUpdateEmployee}
          takenEvents={takenEvents}
        />
      </InnerLayout>
    </Fragment>
  );
};

Dashboard.propTypes = {
  onUpdateEvents: PT.func.isRequired,
  onUpdateEmployee: PT.func.isRequired,
  takenEvents: PT.array,
  events: PT.array,
  updateTakenEvents: PT.func.isRequired,
  employeeId: PT.number,
  isEventBeingUpdated: PT.bool,
  onCalendarNavigate: PT.func.isRequired,
};

Dashboard.defaultProps = {
  bookingModalOpen: false,
};

export default container(Dashboard);
