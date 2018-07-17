import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container, Columns, Stat } from './styled';
import { HolidayList } from '../../components/HolidayList';

export const User = props => {
  return (
    <Container>
      <h2>My Team</h2>
      <Columns>
        <Stat>
          <h1>6 MEMBERS</h1>
          <h4>Active</h4>
        </Stat>
        <Stat>
          <h1>2 MEMBERS</h1>
          <h4>On Holiday</h4>
        </Stat>
        <Stat>
          <h1>4 MEMBERS</h1>
          <h4>Working from home</h4>
        </Stat>
      </Columns>

      <Columns>
        <div>
          <h3>Active Members</h3>
        </div>
        <div>
          <h3>Pending Holidays</h3>
          <HolidayList
            holidays={[]}
            columns={['employee', 'startDate', 'endDate']}
          />
        </div>
      </Columns>
    </Container>
  );
};

User.propTypes = {
  localUser: PT.object,
  profileUser: PT.object,
  profileHolidays: PT.array,
  history: PT.object,
};

export default User;
