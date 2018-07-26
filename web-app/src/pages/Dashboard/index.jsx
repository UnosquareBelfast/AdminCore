import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { BookingCalendar, BookingModal, Legend } from '../../components';
import { InnerLayout } from './styled';

export const Dashboard = props => {
  const {
    booking,
    closeModal,
    updateBookingAndDuration,
    showModal,
    takenHolidays,
    updateTakenHolidays,
    userDetails,
    onUpdateEvents,
    onUpdateEmployee,
  } = props;

  return (
    <Fragment>
      <BookingModal
        booking={booking}
        closeModal={closeModal}
        employeeId={userDetails.employeeId.toString()}
        updateBookingAndDuration={updateBookingAndDuration}
        showModal={showModal}
        updateTakenHolidays={updateTakenHolidays}
      />
      <InnerLayout>
        <BookingCalendar
          userDetails={userDetails}
          takenHolidays={takenHolidays}
          updateBookingAndDuration={updateBookingAndDuration}
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
  booking: PT.object.isRequired,
  closeModal: PT.func.isRequired,
  onUpdateEvents: PT.func.isRequired,
  onUpdateEmployee: PT.func.isRequired,
  showModal: PT.bool.isRequired,
  takenHolidays: PT.array.isRequired,
  updateBookingAndDuration: PT.func.isRequired,
  updateTakenHolidays: PT.func.isRequired,
  userDetails: PT.object.isRequired,
};

export default container(Dashboard);
