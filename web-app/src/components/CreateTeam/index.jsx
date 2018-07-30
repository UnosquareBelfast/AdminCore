import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import CreateTeamForm from './CreateTeamForm';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const CreateTeam = ({ submitRequest, history }) => {
  return (
    <div>
      <CornerButton>
        <Button
          onClick={() => history.replace('/admin/teams')}
          label="View Teams"
        />
      </CornerButton>
      <h2>Create Team</h2>
      <CreateTeamForm onSuccess={submitRequest} />
    </div>
  );
};

CreateTeam.propTypes = {
  submitRequest: PT.func.isRequired,
  history: PT.object.isRequired,
};

export default container(CreateTeam);
