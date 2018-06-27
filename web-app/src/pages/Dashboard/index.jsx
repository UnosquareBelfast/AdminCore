import React from 'react';
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
import { Layout, withAuth } from '../../hoc';
import { flowRight } from 'lodash';
import { InnerLayout } from './styled';

moment.locale('en-gb');
Calendar.momentLocalizer(moment);

export const Dashboard = props => {
  return (
    <Layout {...props}>
      <BookingModal {...props} />
      <InnerLayout>
        <Calendar
          events={props.takenHolidays}
          onSelectSlot={props.onSelectSlot}
          onSelectEvent={props.onSelectEvent}
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
    </Layout>
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
  takenHolidays: PT.array,
};

const enhance = flowRight(withAuth, container);
export default enhance(Dashboard);
