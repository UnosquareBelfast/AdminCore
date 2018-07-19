import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import UserForm from '../CreateContractForms/user';
import TeamForm from '../CreateContractForms/team';
import DateForm from '../CreateContractForms/dates';
import { Steps } from '../common';

export const CreateContract = props => {
  const { step, nextStep, submit } = props;

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
            component: <TeamForm onSuccess={nextStep} />,
          },
          {
            title: 'Contract Dates',
            component: <DateForm onSuccess={submit} />,
          },
          {
            title: 'Submission',
            component: <p>Submitted Contract</p>,
          },
        ]}
      />
    </div>
  );
};

CreateContract.propTypes = {
  step: PT.number.isRequired,
  nextStep: PT.func.isRequired,
  submit: PT.func.isRequired,
};

CreateContract.defaultProps = {
  error: false,
  success: false,
};

export default container(CreateContract);
