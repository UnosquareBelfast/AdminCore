import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import CreateTeamForm from './CreateTeamForm';

export const CreateTeam = ({ submitRequest, success }) => {
  return (
    <div>
      <h2>Create Team</h2>
      <CreateTeamForm onSuccess={submitRequest} />
      {success && <p>Team created successfully!</p>}
    </div>
  );
};

CreateTeam.propTypes = {
  submitRequest: PT.func.isRequired,
  success: PT.bool.isRequired,
};

export default container(CreateTeam);
