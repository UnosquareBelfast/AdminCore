import React from 'react';
import container from './container';
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
    booking,
    employeeId,
    closeBookingModal,
    bookingModalOpen,
    updateTakenHolidays,
    isEventBeingUpdated,
    bookingDuration,
    createEvent,
    updateEvent,
    cancelEvent,
  } = props;

  return (
    bookingModalOpen && (
      <Modal closeModal={closeBookingModal}>
        <StyleContainer>
          <p onClick={cancelEvent}>Cancel</p>
          <h1>
            {isEventBeingUpdated ? 'Update Booking' : 'Request a Booking'}
          </h1>
          <h4 id="totalDaysToBook">Total days: {bookingDuration}</h4>
          {isEventBeingUpdated && (
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
              createEvent={createEvent}
              updateEvent={updateEvent}
            />
          </FormContainer>
        </StyleContainer>
      </Modal>
    )
  );
};

BookingModal.propTypes = {
  booking: PT.object.isRequired,
  employeeId: PT.number,
  closeBookingModal: PT.func.isRequired,
  bookingModalOpen: PT.bool,
  updateTakenHolidays: PT.func.isRequired,
  bookingDuration: PT.number,
  createEvent: PT.func.isRequired,
  updateEvent: PT.func.isRequired,
  cancelEvent: PT.func.isRequired,
};

export default container(BookingModal);
