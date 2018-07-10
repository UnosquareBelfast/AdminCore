import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
} from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { CustomDatePickerIOS } from '../../Common';

const BookingView = (props) => {
  const {
    startDate,
    changeStartDate,
    endDate,
    changeEndDate,
    submitRequest,
  } = props;


  return (
    <View style={styles.container}>
      <Text>
        Start date
      </Text>
      <CustomDatePickerIOS
        chosenDate={startDate}
        setDate={changeStartDate}
      />
      <Text>
        End date
      </Text>
      <CustomDatePickerIOS
        chosenDate={endDate}
        setDate={changeEndDate}
        minimumDate={startDate}
      />
      <Button onPress={submitRequest} title="Request Holiday" />
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
