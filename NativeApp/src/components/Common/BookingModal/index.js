import React from 'react';
import { Modal, View, Text } from 'react-native';
import { PropTypes as PT } from 'prop-types';

const BookingModal = (props) => {
  const { showModal } = props;

  return (
    <Modal
      animationType="slide"
      visible={showModal}
    >
      <View>
        <Text>
          BookingModal
        </Text>
      </View>
    </Modal>
  );
};

BookingModal.defaultProps = {
  showModal: false,
};

BookingModal.propTypes = {
  showModal: PT.bool,
};

export default BookingModal;
