import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../common';

const BookingModalForm = props => {
  const {
    isEventBeingUpdated,
    submitHolidayRequest,
    updateHolidayRequest,
    deleteHolidayRequest,
    formData,
    formStatus,
    formIsValid,
  } = props;

  const isDateDisabled = () => {
    if (formData.isWFH) {
      return true;
    } else {
      return false;
    }
  };

  const getStartLabel = () => {
    if (formData.isWFH) {
      return 'Enter Date:';
    } else {
      return 'Start Date:';
    }
  };

  const createCtas = () => {
    if (isEventBeingUpdated) {
      return [
        {
          label: 'Update',
          event: updateHolidayRequest,
          disabled: !formIsValid,
        },
        {
          label: 'Cancel',
          event: deleteHolidayRequest,
          disabled: !formIsValid,
        },
      ];
    } else {
      return [
        {
          label: 'Request',
          event: submitHolidayRequest,
          disabled: !formIsValid,
        },
      ];
    }
  };

  return (
    <Form formData={formData} formStatus={formStatus} actions={createCtas()}>
      <Input
        type="date"
        htmlAttrs={{
          type: 'input',
          name: 'start',
          placeholder: 'Enter a start date',
        }}
        value={formData.start}
        rules={{
          dateNotInPast: true,
        }}
        label={getStartLabel()}
      />
      <Input
        type="date"
        htmlAttrs={{
          type: 'input',
          name: 'end',
          placeholder: 'Enter a end date',
          disabled: isDateDisabled(),
        }}
        value={formData.end}
        rules={{
          dateNotInPast: true,
        }}
        label="End Date:"
      />
      <Input
        type="checkbox"
        htmlAttrs={{
          type: 'checkbox',
          name: 'isWFH',
        }}
        value={formData.isWFH}
        label="Working from home"
      />
      <Input
        type="checkbox"
        htmlAttrs={{
          type: 'checkbox',
          name: 'isHalfday',
        }}
        value={formData.isHalfday}
        label="Request a halfday"
      />
    </Form>
  );
};

BookingModalForm.propTypes = {
  formData: PT.object.isRequired,
  isEventBeingUpdated: PT.bool.isRequired,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
  submitHolidayRequest: PT.func.isRequired,
  updateHolidayRequest: PT.func.isRequired,
  deleteHolidayRequest: PT.func.isRequired,
};

BookingModalForm.defaultProps = {
  formIsValid: true,
};

export default container(BookingModalForm);
