import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { PropTypes as PT } from 'prop-types';

const ModalWrapper = (props) => {
  const { showModal, children, closeModal } = props;

  return (
    <Modal
      animationType="slide"
      visible={showModal}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal}>
          <Text>
            Close
          </Text>
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  );
};

ModalWrapper.defaultProps = {
  showModal: false,
};

ModalWrapper.propTypes = {
  showModal: PT.bool,
  children: PT.oneOfType([
    PT.element,
    PT.array,
  ]).isRequired,
  closeModal: PT.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
});

export default ModalWrapper;
