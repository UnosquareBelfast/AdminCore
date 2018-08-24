import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { BigCalendarToolbar } from '../../components';
import { Event } from '../../components/common';

moment.locale('en-gb');
Calendar.momentLocalizer(moment);

export const BookingCalendar = props => {
  const { onSelectSlot, onSelectEvent, events, onNavigate } = props;

  const updateOnNavigate = date => {
    const newDate = new moment(date);
    onNavigate(newDate);
  };

  return (
    <Calendar
      components={{ eventWrapper: Event, toolbar: BigCalendarToolbar }}
      defaultDate={new Date()}
      events={events}
      endAccessor={({ end }) => end.endOf('day')}
      messages={{ agenda: 'team', personal: 'personal' }}
      onSelectSlot={onSelectSlot}
      onSelectEvent={onSelectEvent}
      popup
      showMultiDayTimes
      selectable
      views={{ month: true }}
      formats={{
        weekdayFormat: 'dddd',
      }}
      onNavigate={updateOnNavigate}
    />
  );
};

BookingCalendar.propTypes = {
  onSelectSlot: PT.func.isRequired,
  onSelectEvent: PT.func.isRequired,
  onNavigate: PT.func.isRequired,
  events: PT.array.isRequired,
};

export default container(BookingCalendar);
