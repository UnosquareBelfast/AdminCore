import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { CreateContractForm } from '../';
import { Errorbox } from '../common';

export const CreateContract = props => {
  const { error, success, onSuccess, onFailed } = props;

  return (
    <div>
      <h2>Create Contract</h2>
      <CreateContractForm onSuccess={onSuccess} onFailed={onFailed} />
      <Errorbox
        id="errorCreateContract"
        error={error}
        label="Error creating contract"
      />
      {success && (
        <p id="contractCreatedSuccess">Contract created successfully!</p>
      )}
    </div>
  );
};

CreateContract.propTypes = {
  error: PT.object,
  success: PT.bool,
  onSuccess: PT.func.isRequired,
  onFailed: PT.func.isRequired,
};

CreateContract.defaultProps = {
  error: false,
  success: false,
};

export default container(CreateContract);
