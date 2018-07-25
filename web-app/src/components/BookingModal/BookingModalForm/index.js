import React, { Fragment } from 'react';
import moment from 'moment';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import { getDurationNotice } from '../../../utilities/dates';
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

  const calculateDaysNotice = () => {
    if (daysRequested < 4) {
      return 10;
    } else if (daysRequested > 4 && daysRequested < 10) {
      return 20;
    } else if (daysRequested > 10) {
      return 40;
    } else {
      return 0;
    }
  };

  const composeErrorMessage = () => {
    const { eventStatusId, start } = formData;
    if (isEventBeingUpdated || eventStatusId == 4 || eventStatusId == 5) {
      return null;
    } else {
      const today = new moment();
      const fromTodayToStartDateRequested = getDurationNotice(today, start);

      const daysNotice = calculateDaysNotice();
      let error;
      if (daysRequested == 0) {
        error = {
          message: 'Are you sure you wish to request a day off over a weekend?',
        };
      } else {
        error = {
          message: `You need to give ${daysNotice} working/business days notice to request ${daysRequested} ${
            daysRequested > 1 ? 'days' : 'day'
          } off, and therefore your request might be declined.`,
        };
      }
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
