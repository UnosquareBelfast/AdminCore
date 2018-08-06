import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import CreateUserForm from './CreateUserForm';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const CreateUser = ({ history }) => {
  return (
    <Fragment>
      <CornerButton>
        <Button
          onClick={() => history.replace('/admin/employees')}
          label="View Employees"
        />
      </CornerButton>

      <h2>Create User</h2>
      <CreateUserForm />
    </Fragment>
  );
};

CreateUser.propTypes = {
  history: PT.object.isRequired,
};

export default CreateUser;
