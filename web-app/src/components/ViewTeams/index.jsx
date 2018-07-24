import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import ViewTeamsForm from './ViewTeamsForm';

export const ViewTeams = ({ submitRequest }) => {
  return (
    <div>
      <h2>View Teams</h2>
      <ViewTeamsForm onSuccess={submitRequest} />
    </div>
  );
};

ViewTeams.propTypes = {
  submitRequest: PT.func.isRequired,
};

export default container(ViewTeams);
