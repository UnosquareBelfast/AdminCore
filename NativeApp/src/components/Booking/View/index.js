import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { CustomDatePickerIOS } from '../../Common';

const BookingView = (props) => {
  const {
    startDate,
    changeStartDate,
    endDate,
    changeEndDate,
    submitRequest,
  } = props;

  const formatDate = date => moment(date).toDate();

  return (
    <View style={styles.container}>
      <Text>
        Starting
        {'\n'}
        {startDate}
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
        minimumDate={formatDate(startDate)}
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
    paddingTop: 50,
    backgroundColor: '#fff',
  },
});

export default BookingView;
