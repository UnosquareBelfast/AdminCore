import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { DataTable, UserModal } from '../';
import TeamCells from '../DataTable/Cells/teamsOverview';
import container from './container';

const TeamOverview = ({ history, selectUser, selectedUser, teams }) => {
  return (
    <Fragment>
      <UserModal
        user={selectedUser}
        closeModal={() => selectUser({})}
        history={history}
      />
      <h2>Team Overview</h2>
      <DataTable
        data={teams}
        cells={TeamCells}
        columns={['fullName', 'state', 'team']}
        onRowClick={employee => selectUser(employee)}
        pageSize={20}
      />
    </Fragment>
  );
};

TeamOverview.propTypes = {
  teams: PT.array,
  history: PT.object.isRequired,
  selectUser: PT.func.isRequired,
  selectedUser: PT.object.isRequired,
};

export default container(TeamOverview);
