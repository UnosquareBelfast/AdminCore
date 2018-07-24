import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import UserForm from '../CreateContractForms/user';
import TeamForm from '../CreateContractForms/team';
import DateForm from '../CreateContractForms/dates';
import { Steps } from '../common';
import { ContractStyle } from './styled';

export const CreateContract = props => {
  const { step, nextStep, submit, contract } = props;

  const {
    selectedUser,
    selectedTeam,
    selectedClient,
    startDate,
    endDate,
  } = contract;

  return (
    <div>
      <h2>Create Contract</h2>
      <ContractStyle>
        <h3>Contract</h3>
        <ul>
          {selectedUser ? (
            <li>
              <span>Name: </span>
              {selectedUser.displayValue}
            </li>
          ) : (
            <li>No contract details entered yet.</li>
          )}
          {selectedClient ? (
            <li>
              <span>Client: </span>
              {selectedClient.displayValue}
            </li>
          ) : null}
          {selectedTeam ? (
            <li>
              <span>Team: </span>
              {selectedTeam.displayValue}
            </li>
          ) : null}
          {startDate && endDate ? (
            <li>
              <span>Term: </span>
              {startDate.format('Do MMMM YYYY')} to{' '}
              {endDate.format('Do MMMM YYYY')}
            </li>
          ) : null}
        </ul>
      </ContractStyle>
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
        ]}
      />
    </div>
  );
};

CreateContract.propTypes = {
  step: PT.number.isRequired,
  nextStep: PT.func.isRequired,
  submit: PT.func.isRequired,
  contract: PT.object.isRequired,
};

CreateContract.defaultProps = {
  error: false,
  success: false,
};

export default container(CreateContract);
