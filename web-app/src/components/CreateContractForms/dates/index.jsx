import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import { FormContainer } from '../styled';

export const DateForm = props => {
  const { submitForm, formStatus, formData, formIsValid } = props;

  return (
    <FormContainer>
      <h3>Select contract dates</h3>
      <Form
        formData={formData}
        submitForm={submitForm}
        formStatus={formStatus}
        actions={[
          {
            label: 'Create Contract',
            event: props.submitForm,
            disabled: !formIsValid,
          },
        ]}
      >
        <Input
          label="Start Date:"
          type="date"
          htmlAttrs={{
            type: 'input',
            name: 'startDate',
            placeholder: 'Enter a start date',
          }}
          rules={{}}
          value={formData.startDate}
        />
        <Input
          label="End Date:"
          type="date"
          htmlAttrs={{
            type: 'input',
            name: 'endDate',
            placeholder: 'Enter a end date',
          }}
          value={formData.endDate}
          rules={{}}
        />
      </Form>
    </FormContainer>
  );
};

DateForm.propTypes = {
  formData: PT.object.isRequired,
  submitForm: PT.func.isRequired,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
};

export default container(DateForm);
