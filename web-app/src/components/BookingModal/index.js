import React from 'react';
import { PropTypes as PT } from 'prop-types';
import BookingModalForm from '../BookingModalForm';
import { Modal } from '../common';
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
    employeeId,
    updateTakenHolidays,
    getDuration,
  } = props;

  return (
    showModal && (
      <Modal>
        <StyleContainer>
          <span id="closeBookingModal" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} /> Close
          </span>
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
                <StatusDot status={booking.holidayStatusId} />
                {statusText[booking.holidayStatusId]}
              </span>
            </BookingStatus>
          )}
          <FormContainer>
            <BookingModalForm
              updateTakenHolidays={updateTakenHolidays}
              employeeId={employeeId}
              booking={booking}
              closeModal={closeModal}
              getDuration={getDuration}
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
  employeeId: PT.string.isRequired,
  updateTakenHolidays: PT.func.isRequired,
  getDuration: PT.func.isRequired,
};

export default BookingModal;
