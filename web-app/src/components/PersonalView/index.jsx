import React from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import container from './container';
import { EventTable, StatusDot, Header, YourHolidays } from './styled';
import { statusText } from '../../utilities/holidayStatus';

const renderHolidays = holidays => {
  if (!holidays) return null;
  return holidays.map(status =>
    status.map(holiday => (
      <tr key={holiday.id}>
        <td>
          <StatusDot status={holiday.holidayStatusId} />
          {statusText[holiday.holidayStatusId]}
        </td>
        <td>{moment(holiday.start).format('DD/MM/YYYY')}</td>
        <td>{moment(holiday.end).format('DD/MM/YYYY')}</td>
      </tr>
    )),
  );
};

const PersonalView = props => {
  return (
    <div>
      <Header>
        <div>
          <strong>
            <p>Holidays Taken</p>
          </strong>
          <h1>{props.takenHolidays}</h1>
        </div>
        <div>
          <strong>
            <p>Holidays Remaining</p>
          </strong>
          <h1>{props.totalHolidays - props.takenHolidays}</h1>
        </div>
      </Header>

      <YourHolidays>
        <h3>Your Holidays in {moment(props.date).format('MMMM')}</h3>
        <EventTable>
          <tbody>
            <tr>
              <th>Status</th>
              <th>Start</th>
              <th>End</th>
            </tr>
            {renderHolidays(props.holidays)}
          </tbody>
        </EventTable>
      </YourHolidays>
    </div>
  );
};

PersonalView.propTypes = {
  takenHolidays: PT.number,
  totalHolidays: PT.number,
  holidays: PT.array,
  date: PT.object,
};

export default container(PersonalView);
