import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
} from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { CustomDatePicker } from '../../Common';

const BookingView = (props) => {
  const {
    startDate,
    changeStartDate,
    endDate,
    booked,
    updateHoliday,
    changeEndDate,
    submitRequest,
  } = props;

  const renderButton = booked
    ? <Button onPress={updateHoliday} title="updated" />
    : <Button onPress={submitRequest} title="Request Holiday" />;


  return (
    <View style={styles.container}>
      <Text>
        Start date
      </Text>
      <CustomDatePicker
        chosenDate={startDate}
        setDate={changeStartDate}
      />
      <Text>
        End date
      </Text>
      <CustomDatePicker
        chosenDate={endDate}
        setDate={changeEndDate}
        minimumDate={startDate}
      />
      {renderButton}
    </View>
  );
};

BookingView.propTypes = {
  startDate: PT.string.isRequired,
  endDate: PT.string.isRequired,
  changeStartDate: PT.func.isRequired,
  changeEndDate: PT.func.isRequired,
  submitRequest: PT.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
});

export default BookingView;
