import React, { Fragment } from 'react';
import moment from 'moment';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Form, Input } from '../../common';
import eventTypes from '../../../utilities/eventTypes';
import {
  getDurationBetweenDates,
  calculateDaysNotice,
} from '../../../utilities/dates';
import Errorbox from '../../common/Errorbox';

const BookingModalForm = props => {
  const {
    isEventBeingUpdated,
    createEvent,
    updateEvent,
    formData,
    formStatus,
    formIsValid,
    bookingDuration,
  } = props;

  const createCtas = () => {
    if (isEventBeingUpdated) {
      return [
        {
          label: 'Update',
          event: updateEvent,
          disabled: !formIsValid,
        },
      ];
    } else {
      return [
        {
          label: 'Request',
          event: createEvent,
          disabled: !formIsValid,
        },
      ];
    }
  };

  const composeErrorMessage = () => {
    const { eventTypeId, start } = formData;
    if (isEventBeingUpdated || eventTypeId !== eventTypes.ANNUAL_LEAVE) {
      return null;
    } else {
      const today = new moment();
      const fromTodayToStartDateRequested = getDurationBetweenDates(
        today,
        start,
      );

      const daysNotice = calculateDaysNotice(bookingDuration);
      let error = {
        message: `You should give ${daysNotice} working/business days notice to request ${bookingDuration} ${
          bookingDuration > 1 ? 'days' : 'day'
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
          label={formData.isHalfday ? 'Date' : 'Start Date:'}
        />
        <Input
          type="date"
          htmlAttrs={{
            type: 'input',
            name: 'end',
            placeholder: 'Enter an end date',
            disabled: formData.isHalfday,
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
  bookingDuration: PT.number,
  formData: PT.object.isRequired,
  isEventBeingUpdated: PT.bool,
  formStatus: PT.func.isRequired,
  formIsValid: PT.bool.isRequired,
  createEvent: PT.func.isRequired,
  updateEvent: PT.func.isRequired,
};

BookingModalForm.defaultProps = {
  formIsValid: true,
};

export default container(BookingModalForm);
