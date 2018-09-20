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
import { NoticeAlert } from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/fontawesome-free-solid';

const BookingModalForm = props => {
  const {
    isEventBeingUpdated,
    createEvent,
    updateEvent,
    formData,
    formStatus,
    formIsValid,
    bookingDuration,
    booking,
  } = props;

  const createCtas = () => {
    if (isEventBeingUpdated) {
      return [
        {
          label: `Update to ${
            bookingDuration === 0.5 ? 'Half' : bookingDuration
            } ${bookingDuration > 1 ? 'Days' : 'Day'}`,
          event: updateEvent,
          disabled: !formIsValid,
        },
      ];
    } else {
      return [
        {
          label: `Request ${
            bookingDuration === 0.5 ? 'Half' : bookingDuration
            } ${bookingDuration > 1 ? 'Days' : 'Day'}`,
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
        start
      );
      const daysNotice = calculateDaysNotice(bookingDuration);
      return fromTodayToStartDateRequested < daysNotice ? (
        <NoticeAlert>
          <p>
            <FontAwesomeIcon icon={faExclamationCircle} />
            <span>This booking could be declined.</span>
          </p>
          <p>
            You should give {daysNotice} working/business days notice to request
            {' ' + bookingDuration} {bookingDuration > 1 ? 'days' : 'day'} off.
          </p>
        </NoticeAlert>
      ) : null;
    }
  };

  const renderRejectionReasonMessage = booking => {
    if (booking.messages) {
      return false;
    }
    return true;
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
          type="input"
          htmlAttrs={{
            type: 'input',
            name: 'employeeRejectionMessage',
            disabled: renderRejectionReasonMessage(booking),
          }}
          value={formData.employeeRejectionMessage}
          label="Rejection Response:"
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
        <Input
          type="input"
          className={isEventBeingUpdated ? null : 'hide'}
          htmlAttrs={{
            type: 'input',
            name: 'updateMessage',
            placeholder: 'optional',
          }}
          value={formData.updateMessage}
          label="Reason for updating holiday:"
          labelClass={isEventBeingUpdated ? null : 'hide'}
          disabled={!formIsValid}
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
  booking: PT.object,
};

BookingModalForm.defaultProps = {
  formIsValid: true,
};

export default container(BookingModalForm);
