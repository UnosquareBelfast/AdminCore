import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { ContainerStyle } from './styled';

const index = ({ teams, selectTeam }) => {
  // MOCK, REMOVE ONCE CLIENT NAMES ARE IN REQUEST.
  let clientTeams = teams.reduce((acc, team) => {
    let newTeam = { ...team };
    newTeam.client = 'Foundation Medicine';
    return acc.concat(newTeam);
  }, []);
  // END MOCK

  const teamsSortedByClient = clientTeams.reduce((acc, team) => {
    const { client } = team;
    let teamName = team.team;
    if (!acc[client]) {
      acc[client] = [teamName];
    } else {
      acc[client].push(teamName);
    }
    return acc;
  }, {});

  const renderSidebar = () => {
    return Object.keys(teamsSortedByClient).map(client => {
      return (
        <Fragment key={client}>
          <h4 className="client">{client}</h4>
          {renderTeamLinks(teamsSortedByClient[client])}
        </Fragment>
      );
    });
  };

  const renderTeamLinks = clientTeams => {
    return clientTeams.map(team => (
      <p key={team} className="team-link" onClick={() => selectTeam(team)}>
        {team}
      </p>
    ));
  };

  const renderEmpty = <p>You have not be assigned to a team yet.</p>;

  return (
    <ContainerStyle>
      <h3 className="title">Your Teams</h3>
      {teams.length > 0 ? renderSidebar() : renderEmpty}
    </ContainerStyle>
  );
};

index.propTypes = {
  teams: PT.array.isRequired,
  selectTeam: PT.func.isRequired,
};

export default index;
