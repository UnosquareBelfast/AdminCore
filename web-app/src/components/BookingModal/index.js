import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Button, Modal, Input } from '../common';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import {
  StyleContainer,
  BookingStatus,
  StatusDot,
  ButtonWrap,
  Form,
} from './styled';
import { statusText } from '../../utilities/holidayStatus';

const BookingModal = props => {
  const {
    closeModal,
    showModal,
    booking,
    formElementsArray,
    requestHoliday,
    cancelHoliday,
    updateHoliday,
    formChanged,
  } = props;

  const getActions = () =>
    booking.title ? (
      <ButtonWrap>
        <Button
          id="updateHolidayBtn"
          onClick={updateHoliday}
          label={'Update'}
          disabled={!booking.formIsValid}
        />
        <Button
          id="cancelHolidayBtn"
          onClick={cancelHoliday}
          label={'Cancel Booking'}
          disabled={!booking.formIsValid}
        />
      </ButtonWrap>
    ) : (
      <Button
        id="requestHolidayBtn"
        onClick={requestHoliday}
        label={booking.form.isWFH.value ? 'Add' : 'Request'}
        disabled={!booking.formIsValid}
      />
    );

  const cssFormConfig = () => {
    let cssClass = '';
    if (booking.duration == 0) {
      cssClass = 'workingFromHome';
    } else if (booking.duration == 0.5) {
      cssClass = 'bookingHalfDay';
    }
    return cssClass;
  };

  const form = (
    <Form id="bookingForm" className={cssFormConfig()}>
      {formElementsArray.map(({ id, config }, index) => (
        <Input
          key={id}
          label={config.label}
          elementType={config.elementType}
          elementConfig={config.elementConfig}
          value={config.value}
          invalid={!config.valid}
          shouldValidate={config.validation}
          focus={index === 0 ? true : false}
          touched={config.touched}
          changed={event => formChanged(event, id)}
        />
      ))}
      <div>
        <h4 id="totalDaysToBook">Total days: {booking.duration}</h4>
        {getActions()}
      </div>
    </Form>
  );

  return (
    showModal && (
      <Modal>
        <StyleContainer>
          <span id="closeBookingModal" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} /> Close
          </span>
          <h1>Booking</h1>
          {booking.title && (
            <BookingStatus>
              <h4>{booking.title}</h4>
              <span>
                <StatusDot status={booking.holidayStatusId} />
                {statusText[booking.holidayStatusId]}
              </span>
            </BookingStatus>
          )}
          {form}
        </StyleContainer>
      </Modal>
    )
  );
};

BookingModal.propTypes = {
  showModal: PT.bool.isRequired,
  booking: PT.object.isRequired,
  closeModal: PT.func.isRequired,
  formChanged: PT.func.isRequired,
  requestHoliday: PT.func.isRequired,
  cancelHoliday: PT.func.isRequired,
};

export default BookingModal;
