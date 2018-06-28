import React from 'react';
import { Text, Button } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { ModalWrapper } from '../../Common';

const BookingModal = (props) => {
  const {
    showModal,
    closeModal,
    booking,
    submitRequest,
  } = props;

  return (
    <ModalWrapper
      showModal={showModal}
      closeModal={closeModal}
    >
      <Text>
        Starting
        {'\n'}
        {booking.date}
      </Text>
      <Button onPress={submitRequest} title="Request Holiday" />
    </ModalWrapper>
  );
};

BookingModal.propTypes = {
  showModal: PT.bool.isRequired,
  closeModal: PT.func.isRequired,
  submitRequest: PT.func.isRequired,
  booking: PT.shape({
    date: PT.string,
  }).isRequired,
};

export default BookingModal;
