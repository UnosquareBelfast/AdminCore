import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import { FormContainer } from './styled';

export const CreateTeamForm = props => {
  const { formStatus, formData, clients } = props;

  if (clients.length > 0) {
    return (
      <FormContainer>
        <Form formData={formData} formStatus={formStatus}>
          <Input
            label="Pick a client:"
            type="select"
            htmlAttrs={{
              name: 'selectedClient',
              options: clients,
              disabled: clients.length === 0,
            }}
            value={formData.selectedClient}
          />
        </Form>
      </FormContainer>
    );
  } else {
    return (
      <p>
        No teams can exist without a client. You are required to create a client
        to view this page.
      </p>
    );
  }
};

CreateTeamForm.propTypes = {
  clients: PT.array,
  formData: PT.object.isRequired,
  formStatus: PT.func.isRequired,
};

CreateTeamForm.defaultProps = {
  clients: [],
};

export default container(CreateTeamForm);
