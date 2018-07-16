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
  userDetails: PT.object.isRequired,
  updateTakenHolidays: PT.func.isRequired,
  onSelectSlot: PT.func.isRequired,
  onSelectEvent: PT.func.isRequired,
  booking: PT.object.isRequired,
  closeModal: PT.func.isRequired,
  showModal: PT.bool.isRequired,
  takenHolidays: PT.array.isRequired,
  getDuration: PT.func.isRequired,
};

export default container(Dashboard);
