import React from 'react';
import container from './container';
import ModalStatusBanner from './ModalStatusBanner';
import { PropTypes as PT } from 'prop-types';
import BookingModalForm from './BookingModalForm';
import { Modal } from '../common';
import { StyleContainer, FormContainer } from './styled';

const BookingModal = props => {
  const {
    booking,
    employeeId,
    closeBookingModal,
    bookingModalOpen,
    updateTakenEvents,
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
          {isEventBeingUpdated && (
            <ModalStatusBanner
              userName={booking.title}
              eventStatus={booking.eventStatus}
              eventType={booking.eventType}
              cancelEvent={cancelEvent}
            />
          )}
          <h1>
            {isEventBeingUpdated ? 'Update Booking' : 'Request a Booking'}
          </h1>
          <h4 id="totalDaysToBook">Total days: {bookingDuration}</h4>

          <FormContainer>
            <BookingModalForm
              updateTakenEvents={updateTakenEvents}
              employeeId={employeeId}
              booking={booking}
              bookingDuration={bookingDuration}
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
  updateTakenEvents: PT.func.isRequired,
  bookingDuration: PT.number,
  createEvent: PT.func.isRequired,
  updateEvent: PT.func.isRequired,
  cancelEvent: PT.func.isRequired,
};

export default container(BookingModal);
