import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Container, Columns, Stat } from './styled';
import { HolidayList } from '../../components/HolidayList';
import { UserList } from '../../components/UserList';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChild, faMap, faHome } from '@fortawesome/fontawesome-free-solid';
import UserModal from './UserModal';

export const User = ({ team, teamHolidays, selectedUser, onUserSelect }) => {
  return (
    <Container>
      <UserModal user={selectedUser} />
      <h2>My Team</h2>
      <Columns>
        <Stat>
          <h1>{team.length} MEMBERS</h1>
          <h4>
            <FontAwesomeIcon icon={faChild} /> Active
          </h4>
        </Stat>
        <Stat>
          <h1>2 MEMBERS</h1>
          <h4>
            <FontAwesomeIcon icon={faMap} /> On Holiday
          </h4>
        </Stat>
        <Stat>
          <h1>4 MEMBERS</h1>
          <h4>
            <FontAwesomeIcon icon={faHome} /> Working from home
          </h4>
        </Stat>
      </Columns>

      <Columns>
        <div>
          <h3>Active Members</h3>
          <UserList
            users={team}
            columns={['fullName', 'email']}
            onRowClick={onUserSelect}
          />
        </div>
        <div>
          <h3>
            Member's Pending Holidays{' '}
            {teamHolidays != 0
              ? `(${teamHolidays.length} needing reviewed)`
              : null}
          </h3>
          <HolidayList
            holidays={teamHolidays}
            columns={['employee', 'startDate', 'endDate']}
          />
        </div>
      </Columns>
    </Container>
  );
};

User.propTypes = {
  history: PT.object,
  team: PT.array,
  teamHolidays: PT.array,
  selectedUser: PT.object,
  onUserSelect: PT.func.isRequired,
};

User.defaultProps = {
  team: [],
  teamHolidays: [],
  selectedUser: null,
};

export default container(User);
