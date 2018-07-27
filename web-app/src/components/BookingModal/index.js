import React from 'react';
import { PropTypes as PT } from 'prop-types';
import BookingModalForm from './BookingModalForm';
import { Modal } from '../common';
import {
  StyleContainer,
  BookingStatus,
  StatusDot,
  FormContainer,
} from './styled';

const BookingModal = props => {
  const {
    closeModal,
    showModal,
    booking,
    employeeId,
    updateTakenHolidays,
    updateBookingAndDuration,
  } = props;

  return (
    showModal && (
      <Modal closeModal={closeModal}>
        <StyleContainer>
          <h1>
            {booking.isEventBeingUpdated
              ? 'Update Booking'
              : 'Request a Booking'}
          </h1>
          <h4 id="totalDaysToBook">Total days: {booking.duration}</h4>
          {booking.isEventBeingUpdated && (
            <BookingStatus>
              <h4>{booking.title}</h4>
              <span>
                <StatusDot status={booking.eventStatus.eventStatusId} />
                {booking.eventStatus.description}
              </span>
            </BookingStatus>
          )}
          <FormContainer>
            <BookingModalForm
              updateTakenHolidays={updateTakenHolidays}
              employeeId={employeeId}
              booking={booking}
              closeModal={closeModal}
              updateBookingAndDuration={updateBookingAndDuration}
            />
          </FormContainer>
        </StyleContainer>
      </Modal>
    )
  );
};

BookingModal.propTypes = {
  closeModal: PT.func.isRequired,
  showModal: PT.bool.isRequired,
  booking: PT.object.isRequired,
  employeeId: PT.any.isRequired,
  updateTakenHolidays: PT.func.isRequired,
  updateBookingAndDuration: PT.func.isRequired,
};

export default BookingModal;
