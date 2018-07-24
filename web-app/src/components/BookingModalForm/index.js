import React from 'react';
import moment from 'moment';
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

  const updateVisability = () => {
    return Math.floor(
      moment.duration(formData.end.diff(formData.start)).asDays(),
    ) === 0
      ? false
      : true;
  };

  return (
    <Form formData={formData} formStatus={formStatus} actions={createCtas()}>
      <Input
        type="select"
        htmlAttrs={{
          name: 'eventStatusId',
          options: [
            { value: 1, displayValue: 'Annual Leave' },
            { value: 4, displayValue: 'Working Remotely' },
            { value: 5, displayValue: 'Sick Leave' },
          ],
        }}
        value={formData.eventStatusId}
        label="Reason:"
      />
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
        label="Start Date:"
      />
      <Input
        type="date"
        htmlAttrs={{
          type: 'input',
          name: 'end',
          placeholder: 'Enter an end date',
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
          name: 'isHalfday',
          disabled: updateVisability(),
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
