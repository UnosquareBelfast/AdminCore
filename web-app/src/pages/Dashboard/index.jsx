import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Leave } from '../../components';
import { Layout, withAuth } from '../../hoc';
import { flowRight } from 'lodash';
import { Sidebar } from './styled';

Calendar.momentLocalizer(moment);

const dummyEvents = [
  {
    id: 14,
    title: 'BG',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 4,
    title: 'BG',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 1,
    title: 'BG',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
];

const Dashboard = props => {
  return (
    <Layout {...props}>
      <Sidebar>
        <Leave user={ props.user } totalHolidays={  props.totalHolidays }/>
      </Sidebar>
      <Calendar
        events={dummyEvents}
        onSelectSlot={props.onSelectSlot}
        onSelectEvent={props.onSelectEvent}
        selectable
      />
      {/* <RequestHoliday
        user={props.user}
        show={() => {}}
        onClose={() => {}}
      /> */}
    </Layout>
  );
};

Dashboard.propTypes = {
  user: PT.object,
  totalHolidays: PT.number,
  toggleHolidayModal: PT.func,
  date: PT.object,
  onSelectSlot: PT.func,
  onSelectEvent: PT.func,
};

const enhance = flowRight(withAuth, container);
export default enhance(Dashboard);
