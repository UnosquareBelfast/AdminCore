import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import ViewTeamsForm from './ViewTeamsForm';
import { TeamList } from '../';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const ViewTeams = ({ teamSearch, teams, history }) => {
  return (
    <div>
      <CornerButton>
        <Button
          onClick={() => history.replace('/admin/teams/new')}
          label="New Team"
        />
      </CornerButton>
      <h2>View Teams</h2>
      <ViewTeamsForm onChange={teamSearch} />
      <TeamList teams={teams} columns={['teamName']} />
    </div>
  );
};

ViewTeams.propTypes = {
  teamSearch: PT.func.isRequired,
  teams: PT.array.isRequired,
  history: PT.object.isRequired,
};

export default container(ViewTeams);
