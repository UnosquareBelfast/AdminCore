import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import ViewTeamsForm from './ViewTeamsForm';
import { TeamList } from '../';

export const ViewTeams = ({ teamSearch, teams }) => {
  return (
    <div>
      <h2>View Teams</h2>
      <ViewTeamsForm onChange={teamSearch} />
      <TeamList teams={teams} columns={['teamName']} />
    </div>
  );
};

ViewTeams.propTypes = {
  teamSearch: PT.func.isRequired,
  teams: PT.array.isRequired,
};

export default container(ViewTeams);
