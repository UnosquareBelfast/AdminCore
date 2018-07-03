import React from 'react';
import { Text, Button } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { ModalWrapper, CustomDatePickerIOS } from '../../Common';

const BookingModal = (props) => {
  const {
    showModal,
    closeModal,
    startDate,
    endDate,
    submitRequest,
    changeStartDate,
    changeEndDate,
  } = props;

  const formatDate = date => moment(date).toDate();

  return (
    <ModalWrapper
      showModal={showModal}
      closeModal={closeModal}
    >
      <Text>
        Starting
        {'\n'}
      </Text>
      <CustomDatePickerIOS
        chosenDate={formatDate(startDate)}
        setDate={changeStartDate}
      />
      <Text>
        Ending
      </Text>
      <CustomDatePickerIOS
        chosenDate={formatDate(endDate)}
        setDate={changeEndDate}
      />
      <Button onPress={submitRequest} title="Request Holiday" />
    </ModalWrapper>
  );
};

BookingModal.propTypes = {
  showModal: PT.bool.isRequired,
  closeModal: PT.func.isRequired,
  submitRequest: PT.func.isRequired,
  startDate: PT.string.isRequired,
  endDate: PT.string.isRequired,
  changeStartDate: PT.func.isRequired,
  changeEndDate: PT.func.isRequired,
};

export default BookingModal;
