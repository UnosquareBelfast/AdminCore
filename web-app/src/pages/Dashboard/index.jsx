import React, { Fragment } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import {
  BookingModal,
  Legend,
  TeamView,
  PersonalView,
  BigCalendarToolbar,
} from '../../components';
import { Event } from '../../components/common';
import { InnerLayout } from './styled';

moment.locale('en-gb');
Calendar.momentLocalizer(moment);

export const Dashboard = props => {
  const {
    userDetails,
    closeModal,
    showModal,
    booking,
    takenHolidays,
    onSelectSlot,
    onSelectEvent,
    updateTakenHolidays,
    getDuration,
  } = props;
  return (
    <Fragment>
      <BookingModal
        updateTakenHolidays={updateTakenHolidays}
        employeeId={userDetails.employeeId.toString()}
        closeModal={closeModal}
        showModal={showModal}
        booking={booking}
        getDuration={getDuration}
      />
      <InnerLayout>
        <Calendar
          showMultiDayTimes
          events={takenHolidays}
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          endAccessor={({ end }) => end.endOf('day')}
          defaultDate={new Date()}
          components={{ eventWrapper: Event, toolbar: BigCalendarToolbar }}
          views={{
            month: true,
            personal: PersonalView,
            agenda: TeamView,
          }}
          messages={{ agenda: 'team', personal: 'personal' }}
          selectable
          popup
          user={userDetails}
          takenHolidays={takenHolidays}
        />
        <Legend />
      </InnerLayout>
    </Fragment>
  );
};

Dashboard.propTypes = {
  user: PT.object,
  userDetails: PT.object,
  updateTakenHolidays: PT.func,
  totalHolidays: PT.number,
  toggleHolidayModal: PT.func,
  date: PT.object,
  onSelectSlot: PT.func,
  onSelectEvent: PT.func,
  booking: PT.object,
  showBookingModal: PT.bool,
  closeModal: PT.func,
  showModal: PT.bool,
  submitForm: PT.func,
  formStatus: PT.func,
  takenHolidays: PT.array,
  getDuration: PT.func,
};

export default container(Dashboard);
