import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../../common';
import { FormContainer } from '../styled';

export const DateForm = props => {
  const { submitForm, formStatus, formData } = props;

  return (
    <FormContainer>
      <h3>Select contract dates</h3>
      <Form
        formData={formData}
        formStatus={formStatus}
        actions={[
          {
            label: 'Create Contract',
            event: submitForm,
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
            disabled: formData.isOpenEnded,
          }}
          value={formData.endDate}
          rules={{}}
        />
        <Input
          type="checkbox"
          htmlAttrs={{
            type: 'checkbox',
            name: 'isOpenEnded',
          }}
          value={formData.isOpenEnded}
          label="Open ended (No end date)"
        />
      </Form>
    </FormContainer>
  );
};

DateForm.propTypes = {
  formData: PT.object.isRequired,
  submitForm: PT.func.isRequired,
  formStatus: PT.func.isRequired,
};

export default container(DateForm);
