import React, { Fragment } from 'react';
import moment from 'moment';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import {
  getDurationBetweenDates,
  calculateDaysNotice,
} from '../../../utilities/dates';
import Errorbox from '../../common/Errorbox';

const BookingModalForm = props => {
  const {
    isEventBeingUpdated,
    submitHolidayRequest,
    updateHolidayRequest,
    deleteHolidayRequest,
    formData,
    formStatus,
    formIsValid,
    daysRequested,
  } = props;

  const createCtas = () => {
    if (isEventBeingUpdated) {
      return [
        {
          label: 'Update',
          event: updateHolidayRequest,
          disabled: !formIsValid || daysRequested === 0,
        },
        {
          label: 'Cancel',
          event: deleteHolidayRequest,
          disabled: !formIsValid || daysRequested === 0,
        },
      ];
    } else {
      return [
        {
          label: 'Request',
          event: submitHolidayRequest,
          disabled: !formIsValid || daysRequested === 0,
        },
      ];
    }
  };

  const composeErrorMessage = () => {
    const { eventTypeId, start } = formData;
    if (isEventBeingUpdated || eventTypeId !== 1) {
      return null;
    } else {
      const today = new moment();
      const fromTodayToStartDateRequested = getDurationBetweenDates(
        today,
        start,
      );

      const daysNotice = calculateDaysNotice(daysRequested);
      let error = {
        message: `You should give ${daysNotice} working/business days notice to request ${daysRequested} ${
          daysRequested > 1 ? 'days' : 'day'
        } off, and therefore your request might be declined.`,
      };
      return fromTodayToStartDateRequested < daysNotice ? (
        <Errorbox error={error} label="Warning" />
      ) : null;
    }
  };

  return (
    <Fragment>
      {composeErrorMessage()}
      <Form formData={formData} formStatus={formStatus} actions={createCtas()}>
        <Input
          type="select"
          htmlAttrs={{
            name: 'eventTypeId',
            options: [
              { value: 1, displayValue: 'Annual Leave' },
              { value: 2, displayValue: 'Working from home' },
              { value: 3, displayValue: 'Sick Leave' },
              { value: 4, displayValue: 'Work Related travel' },
            ],
          }}
          value={formData.eventTypeId}
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
          }}
          value={formData.isHalfday}
          label="Request a halfday"
        />
      </Form>
    </Fragment>
  );
};

BookingModalForm.propTypes = {
  daysRequested: PT.number.isRequired,
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
