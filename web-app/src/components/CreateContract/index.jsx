import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import UserForm from '../CreateContractForms/user';
import DateForm from '../CreateContractForms/dates';
import { Steps } from '../common';

export const CreateContract = props => {
  const { step, nextStep } = props;

  return (
    <div>
      <h2>Create Contract</h2>
      <Steps
        current={step}
        steps={[
          {
            title: 'Find Employee',
            component: <UserForm onSuccess={nextStep} />,
          },
          {
            title: 'Find Team',
            component: <p>Find Team</p>,
          },
          {
            title: 'Contract Dates',
            component: <DateForm onSuccess={nextStep} />,
          },
        ]}
      />
    </div>
  );
};

CreateContract.propTypes = {
  step: PT.number.isRequired,
  nextStep: PT.func.isRequired,
};

CreateContract.defaultProps = {
  error: false,
  success: false,
};

export default container(CreateContract);
