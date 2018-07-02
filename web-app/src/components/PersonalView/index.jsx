import React from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import container from './container';
import { Header, YourHolidays } from './styled';
import { HolidayList } from '../';

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
        <HolidayList 
          holidays={props.holidays}
          columns={['status', 'startDate', 'endDate', 'requestedDate']}
        />
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
