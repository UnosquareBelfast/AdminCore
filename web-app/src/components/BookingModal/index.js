import React from 'react';
import container from './container';
import ModalStatusBanner from './ModalStatusBanner';
import { PropTypes as PT } from 'prop-types';
import BookingModalForm from './BookingModalForm';
import { Modal } from '../common';
// import { Ul } from '../common_styled';

import { StyleContainer, FormContainer, Ul } from './styled';
import { Spinner } from '../common';
import { SpinnerContainer } from '../../hoc/AuthUserAndStore/styled';

const rejectionReason = booking => {
  if (booking.messages) {
    return booking.messages.message;
  }
  return undefined;
};

const legacyHolidayMessagelist = legacyMessages => {

  if (!legacyMessages.length) {
    return <div />;
  }

  const employee1 = { name: legacyMessages[0].author, eventMessageId: legacyMessages[0].eventMessageId };

  const employeeMessage = 'employee-message';
  return (
    <Ul>
      {legacyMessages.map((element, index) => {
        return (<li key={index} className={element.author === employee1.name ? employeeMessage + '-1' : employeeMessage + '-2'}>
          <div className="legacy-message-container">
            <h3>{element.author + ':'} </h3>
            <div className="legacy-message">
              <h3>{element.message}</h3>
            </div>
          </div>
        </li>);
      })}
    </Ul>
  );
};

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
    toggleLegacyHolidayMessageView,
    toggleRejectionMessageView,
    legacyMessages,
    loading,
  } = props;

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
            toggleRejectionMessageView={toggleRejectionMessageView}
            toggleLegacyHolidayMessageView={toggleLegacyHolidayMessageView}
            toggleRejectionResponseView={toggleRejectionResponseView}
            userName={booking.title}
            eventStatus={booking.eventStatus}
            eventType={booking.eventType}
            cancelEvent={cancelEvent}
            rejectionReason={rejectionReason(booking)}
            toggleRejectionMessageInputView={toggleRejectionMessageInputView}
          />
        )}
        {toggleRejectionMessageView && (<div><h1>Message History</h1>{legacyHolidayMessagelist(legacyMessages)}</div>)}
        {!toggleRejectionMessageView && (<div><h1>
          {isEventBeingUpdated ? 'Update Booking' : 'Request a Booking'}
        </h1>
          <h4 id="totalDaysToBook">Total days: {bookingDuration}</h4>
          <FormContainer>
            <BookingModalForm
              toggleRejectionMessageView={toggleRejectionMessageView}
              toggleRejectionResponseView={toggleRejectionResponseView}
              updateTakenEvents={updateTakenEvents}
              employeeId={employeeId}
              booking={booking}
              bookingDuration={bookingDuration}
              createEvent={createEvent}
              updateEvent={updateEvent}
            />
          </FormContainer> </div>)}
      </StyleContainer>
    );
  };

  return (
    bookingModalOpen && (
      <Modal closeModal={closeBookingModal}>
        {!loading ? renderModalContent() : renderSpinner()}
      </Modal>
    ));
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
