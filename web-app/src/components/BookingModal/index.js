import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Modal, Form, Input } from '../common';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import {
  StyleContainer,
  BookingStatus,
  StatusDot,
  FormContainer,
} from './styled';
import { statusText } from '../../utilities/holidayStatus';

const BookingModal = props => {
  const {
    closeModal,
    showModal,
    booking,
    submitForm,
    formStatus,
    formIsValid,
  } = props;

  const isDateDisabled = () => {
    if (booking.formData.isWFH || booking.formData.isHalfday) {
      return true;
    } else if (booking.duration === 0.5) {
      return false;
    }
  };

  const getStartDateLabel = () => {
    if (booking.formData.isWFH || booking.formData.isHalfday) {
      return 'Date:';
    } else {
      return 'Start Date:';
    }
  };

  let ctas;
  if (!booking.title) {
    ctas = [
      {
        label: 'Request',
        event: props.submitForm,
        disabled: !formIsValid,
      },
    ];
  } else {
    ctas = [
      {
        label: 'Update',
        event: props.submitForm,
        disabled: !formIsValid,
      },
      {
        label: 'Cancel',
        event: props.submitForm,
        disabled: !formIsValid,
      },
    ];
  }

  const form = (
    <Form
      formData={booking.formData}
      submitForm={submitForm}
      formStatus={formStatus}
      actions={ctas}
    >
      <Input
        type="date"
        htmlAttrs={{
          type: 'input',
          name: 'startDate',
          placeholder: 'Enter a start date',
        }}
        value={booking.formData.startDate}
        rules={{
          dateNotInPast: true,
        }}
        label={getStartDateLabel()}
      />
      <Input
        type="date"
        htmlAttrs={{
          type: 'input',
          name: 'endDate',
          placeholder: 'Enter a end date',
          disabled: isDateDisabled(),
        }}
        value={booking.formData.endDate}
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
        value={booking.formData.isWFH}
        label="Working from home"
      />
      <Input
        type="checkbox"
        htmlAttrs={{
          type: 'checkbox',
          name: 'isHalfday',
        }}
        value={booking.formData.isHalfday}
        label="Request a halfday"
      />
    </Form>
  );

  return (
    showModal && (
      <Modal>
        <StyleContainer>
          <span id="closeBookingModal" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} /> Close
          </span>
          <h1>{booking.title ? 'Update Booking' : 'Request a Booking'}</h1>
          {booking.title && (
            <BookingStatus>
              <h4>{booking.title}</h4>
              <span>
                <StatusDot status={booking.holidayStatusId} />
                {statusText[booking.holidayStatusId]}
              </span>
            </BookingStatus>
          )}
          <FormContainer>
            <h4 id="totalDaysToBook">Total days: {booking.duration}</h4>
            {form}
          </FormContainer>
        </StyleContainer>
      </Modal>
    )
  );
};

BookingModal.propTypes = {
  showModal: PT.bool.isRequired,
  booking: PT.object.isRequired,
  closeModal: PT.func.isRequired,
  submitForm: PT.func.isRequired,
  formStatus: PT.func.isRequired,
};

export default BookingModal;
