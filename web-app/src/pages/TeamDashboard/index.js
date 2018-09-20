import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import TeamSidebar from './TeamSidebar';
import { DataTable, UserModal } from '../../components';
import UserCells from '../../components/DataTable/Cells/users';
import { Layout, ContentLayout, Stat, Columns } from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChild, faMap, faHome } from '@fortawesome/fontawesome-free-solid';

const TeamDashboard = ({
  history,
  teams,
  selectTeam,
  selectedTeam,
  selectedUser,
  closeUserModal,
  onUserSelect,
  userModalVisible,
  hasExtraPermissions,
}) => {
  //TO-DO: Also check client name is the same.
  const team = teams.filter(team => team.team === selectedTeam)[0];

  const renderTeamDetails = () => {
    const { members } = team;
    const holidayCount = members.filter(
      member => member.state === 'Annual Leave'
    ).length;

    const wfhCount = members.filter(
      member => member.state === 'Working From Home'
    ).length;

    return (
      <ContentLayout>
        <h2>{team.team}</h2>
        <Columns>
          <Stat>
            <h1>{members.length} MEMBERS</h1>
            <h4>
              <FontAwesomeIcon icon={faChild} /> Active
            </h4>
          </Stat>
          <Stat>
            <h1>{holidayCount} MEMBERS</h1>
            <h4>
              <FontAwesomeIcon icon={faMap} /> On Holiday
            </h4>
          </Stat>
          <Stat>
            <h1>{wfhCount} MEMBERS</h1>
            <h4>
              <FontAwesomeIcon icon={faHome} /> Working from home
            </h4>
          </Stat>
        </Columns>
        <DataTable
          data={members}
          cells={UserCells}
          columns={['name', 'email', 'state']}
          pageSize={20}
          onRowClick={user => {
            if (hasExtraPermissions) {
              onUserSelect(user);
            }
          }}
        />
      </ContentLayout>
    );
  };

  return (
    <Fragment>
      {userModalVisible && (
        <UserModal
          user={selectedUser}
          closeModal={closeUserModal}
          history={history}
        />
      )}
      <Layout>
        <TeamSidebar teams={teams} selectTeam={selectTeam} />
        {team ? renderTeamDetails() : null}
      </Layout>
    </Fragment>
  );
};

TeamDashboard.propTypes = {
  teams: PT.array.isRequired,
  selectTeam: PT.func.isRequired,
  selectedTeam: PT.string,
  history: PT.object.isRequired,
  onUserSelect: PT.func.isRequired,
  selectedUser: PT.object,
  closeUserModal: PT.func.isRequired,
  userModalVisible: PT.bool.isRequired,
  hasExtraPermissions: PT.bool.isRequired,
};

export default container(TeamDashboard);
