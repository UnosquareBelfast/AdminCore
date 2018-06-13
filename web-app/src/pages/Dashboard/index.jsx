import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import {
  BookingModal,
  UserDetails,
  Legend,
  TeamView,
  PersonalView,
} from '../../components';
import { Event } from '../../components/common';
import { Layout, withAuth } from '../../hoc';
import { flowRight } from 'lodash';
import { Sidebar } from './styled';

moment.locale('en-gb');
Calendar.momentLocalizer(moment);

const Dashboard = props => {
  return (
    <Layout {...props}>
      <BookingModal {...props} />
      <Sidebar>
        <UserDetails user={props.userDetails} />
        <Legend />
      </Sidebar>
      <Calendar
        events={props.takenHolidays}
        onSelectSlot={props.onSelectSlot}
        onSelectEvent={props.onSelectEvent}
        defaultDate={new Date()}
        components={{ eventWrapper: Event }}
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

const enhance = flowRight(
  withAuth,
  container,
);
export default enhance(Dashboard);
