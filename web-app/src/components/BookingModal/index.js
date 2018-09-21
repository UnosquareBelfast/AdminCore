import React from 'react';
import container from './container';
import ModalStatusBanner from './ModalStatusBanner';
import { PropTypes as PT } from 'prop-types';
import BookingModalForm from './BookingModalForm';
import { Modal } from '../common';
import { StyleContainer, FormContainer } from './styled';
import { Spinner } from '../common';
import { SpinnerContainer } from '../../hoc/AuthUserAndStore/styled';

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
    toggleRejectionMessageInputView,
    toggleRejectionResponseView,
    loading,
  } = props;

  const rejectionReason = booking => {
    if (booking.messages) {
      return booking.messages.message;
    }
    return undefined;
  };

  const renderSpinner = () => {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  };

  const renderModalContent = () => {
    return (
      <StyleContainer>
        {isEventBeingUpdated && (
          <ModalStatusBanner
            toggleRejectionResponseView={toggleRejectionResponseView}
            userName={booking.title}
            eventStatus={booking.eventStatus}
            eventType={booking.eventType}
            cancelEvent={cancelEvent}
            rejectionReason={rejectionReason(booking)}
            toggleRejectionMessageInputView={toggleRejectionMessageInputView}
          />
        )}
        <h1>
          {isEventBeingUpdated ? 'Update Booking' : 'Request a Holiday'}
        </h1>
        <FormContainer>
          <BookingModalForm
            toggleRejectionResponseView={toggleRejectionResponseView}
            updateTakenEvents={updateTakenEvents}
            employeeId={employeeId}
            booking={booking}
            bookingDuration={bookingDuration}
            createEvent={createEvent}
            updateEvent={updateEvent}
          />
        </FormContainer>
      </StyleContainer>
    );
  };

  return (
    bookingModalOpen && (
      <Modal closeModal={closeBookingModal}>
        {!loading ?  renderModalContent()  : renderSpinner()}
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
