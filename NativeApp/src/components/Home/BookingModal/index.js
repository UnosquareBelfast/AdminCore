import React from 'react';
import { Text } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { ModalWrapper } from '../../Common';

const BookingModal = (props) => {
  const { showModal, closeModal } = props;

  return (
    <ModalWrapper
      showModal={showModal}
      closeModal={closeModal}
    >
      <Text>
        Booking Modal
      </Text>
    </ModalWrapper>
  );
};

BookingModal.propTypes = {
  showModal: PT.bool.isRequired,
  closeModal: PT.func.isRequired,
};

export default BookingModal;
