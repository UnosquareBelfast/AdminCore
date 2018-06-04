import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import {
  RequestHoliday,
  BookingModal,
  Leave,
  UserDetails,
} from '../../components';
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
        <Leave user={props.userDetails} />
      </Sidebar>
      <Calendar
        events={[]}
        onSelectSlot={props.onSelectSlot}
        onSelectEvent={props.onSelectEvent}
        selectable
        popup
      />
      {/* <RequestHoliday user={props.user} /> */}
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
};

const enhance = flowRight(withAuth, container);
export default enhance(Dashboard);
