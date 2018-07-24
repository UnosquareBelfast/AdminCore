import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { TeamView, PersonalView, BigCalendarToolbar } from '../../components';
import { Event } from '../../components/common';

moment.locale('en-gb');
Calendar.momentLocalizer(moment);

export const BookingCalendar = props => {
  const { onSelectSlot, onSelectEvent, takenHolidays, userDetails } = props;

  return (
    <Calendar
      components={{ eventWrapper: Event, toolbar: BigCalendarToolbar }}
      defaultDate={new Date()}
      events={takenHolidays}
      endAccessor={({ end }) => end.endOf('day')}
      messages={{ agenda: 'team', personal: 'personal' }}
      onSelectSlot={onSelectSlot}
      onSelectEvent={onSelectEvent}
      popup
      showMultiDayTimes
      selectable
      takenHolidays={takenHolidays}
      user={userDetails}
      views={{
        agenda: TeamView,
        month: true,
        personal: PersonalView,
      }}
    />
  );
};

BookingCalendar.propTypes = {
  onSelectSlot: PT.func.isRequired,
  onSelectEvent: PT.func.isRequired,
  takenHolidays: PT.array.isRequired,
  userDetails: PT.object.isRequired,
};

export default container(BookingCalendar);
