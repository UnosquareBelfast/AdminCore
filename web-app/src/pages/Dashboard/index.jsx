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
  return (
    <Fragment>
      <BookingModal
        closeModal={props.closeModal}
        showModal={props.showModal}
        booking={props.booking}
        formStatus={props.formStatus}
        submitForm={props.submitForm}
      />
      <InnerLayout>
        <Calendar
          showMultiDayTimes
          events={props.takenHolidays}
          onSelectSlot={props.onSelectSlot}
          onSelectEvent={props.onSelectEvent}
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
          user={props.userDetails}
          takenHolidays={props.takenHolidays}
        />
        <Legend />
      </InnerLayout>
    </Fragment>
  );
};

Dashboard.propTypes = {
  user: PT.object,
  userDetails: PT.object,
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
};

export default container(Dashboard);
