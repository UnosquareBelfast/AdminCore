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
import { NoticeAlert, HolidayAlert } from './styled';
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
    isSameDay,
    getApprovedDays,
    getPendingDays,
    getTotalDays,
  } = props;

  const { eventTypeId } = formData;
  const buttonTextValue =
  `${eventTypeId !== eventTypes.ANNUAL_LEAVE ? '' : bookingDuration === 0.5 ? 'Half' : bookingDuration}
  ${eventTypeId !== eventTypes.ANNUAL_LEAVE ? 'WFH' : bookingDuration > 1 ? 'Days' : 'Day'}`;

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
          label: `Request ${buttonTextValue} `,
          event: createEvent,
          disabled: !formIsValid,
        },
      ];
    }
  };

  const remainingDays = (getTotalDays - getApprovedDays);
  const pendingDays = getPendingDays;
  const availableDays = (remainingDays - pendingDays);
  const showRemainingHolsAlertMessage = () => {
    return (remainingDays === 0 || bookingDuration > remainingDays) || (availableDays < bookingDuration);     
  };

  const holidayAlertMessage = () => {
    return (
      <HolidayAlert>
        <tag>{availableDays} Days Available</tag>
        <p>You do not have enough remaining holidays, please contact a member of the HR team.</p>     
      </HolidayAlert>
    ); 
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
      return fromTodayToStartDateRequested < daysNotice ?  (
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

  const renderWFH = () => {
    const options = [
      { value: 1, displayValue: 'Annual Leave' } ,
      { value: 2, displayValue: 'Working from home' },
    ];
    isSameDay ? options.shift() : '' ;
    return options;
  };

  return (
    <Fragment>
      {composeErrorMessage()}
      {showRemainingHolsAlertMessage() ? holidayAlertMessage() :
        <Form formData={formData} formStatus={formStatus} actions={createCtas()}>
          <Input
            type="select"
            htmlAttrs={{
              name: 'eventTypeId',
              options: renderWFH(),
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
              disabled: !booking.messages,
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
      }
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
  isSameDay: PT.bool.isRequired,
  getApprovedDays: PT.number,
  getPendingDays: PT.number,
  getTotalDays: PT.number,
};

BookingModalForm.defaultProps = {
  formIsValid: true,
};

export default container(BookingModalForm);
