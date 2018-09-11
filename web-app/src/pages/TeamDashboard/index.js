import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Container, Columns, Stat } from './styled';
import { DataTable, UserModal, HolidayModal } from '../../components';
import HolidayCells from '../../components/DataTable/Cells/holidays';
import UserCells from '../../components/DataTable/Cells/users';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChild, faMap, faHome } from '@fortawesome/fontawesome-free-solid';
import roles from '../../utilities/roles';

export const TeamDashboard = ({
  team,
  teamHolidays,
  selectedUser,
  onUserSelect,
  hideUserModal,
  hideHolidayModal,
  userModalVisible,
  history,
  selectedHoliday,
  selectHoliday,
  userDetails,
}) => {
  const isAdmin = userDetails.employeeRoleId !== roles.STANDARD;

  return (
    <Container>
      {userModalVisible && (
        <UserModal
          user={selectedUser}
          closeModal={hideUserModal}
          history={history}
        />
      )}
      <HolidayModal
        holiday={selectedHoliday}
        closeModal={hideHolidayModal}
        showAdminControls
      />
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

      <Columns fullWidth={!isAdmin}>
        <div>
          <h3>Active Members</h3>
          <DataTable
            data={team}
            cells={UserCells}
            columns={['fullName', 'email']}
            onRowClick={onUserSelect}
          />
        </div>
        {isAdmin && (
          <div>
            <h3>
              Member's Pending Holidays{' '}
              {teamHolidays != 0
                ? `(${teamHolidays.length} needing reviewed)`
                : null}
            </h3>
            <DataTable
              data={teamHolidays}
              cells={HolidayCells}
              columns={['employee', 'startDate', 'endDate']}
              onRowClick={holiday => selectHoliday(holiday)}
            />
          </div>
        )}
      </Columns>
    </Container>
  );
};

TeamDashboard.propTypes = {
  history: PT.object,
  team: PT.array,
  teamHolidays: PT.array,
  selectedUser: PT.object,
  selectedHoliday: PT.object.isRequired,
  selectHoliday: PT.func.isRequired,
  onUserSelect: PT.func.isRequired,
  hideUserModal: PT.func.isRequired,
  hideHolidayModal: PT.func.isRequired,
  userModalVisible: PT.bool.isRequired,
  userDetails: PT.object.isRequired,
};

TeamDashboard.defaultProps = {
  team: [],
  teamHolidays: [],
  selectedUser: null,
};

export default container(TeamDashboard);
