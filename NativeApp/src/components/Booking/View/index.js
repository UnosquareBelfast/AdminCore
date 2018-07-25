import React, { Fragment } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
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
    ? (
      <Fragment>
        <Button
          onPress={() => updateHoliday(false)}
          title="Update Holiday"
        />
        <Button
          onPress={() => updateHoliday(true)}
          title="Cancel Holiday"
        />
      </Fragment>
    )
    : (
      <Button
        onPress={submitRequest}
        title="Request"
        backgroundColor="#00DCFA"
        borderRadius={5}
      />
    );


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>
        I would like to request the following holiday/s:
      </Text>

      <View style={styles.dateForm}>
        <View>
          <Text>
            Start Date:
          </Text>
          <CustomDatePicker
            chosenDate={startDate}
            setDate={changeStartDate}
          />
          <Text>
            End Date:
          </Text>
          <CustomDatePicker
            chosenDate={endDate}
            setDate={changeEndDate}
            minimumDate={startDate}
          />
          <CheckBox
            title="Request half day"
            containerStyle={styles.checkBox}
          />
        </View>
        {renderButton}
      </View>
    </ScrollView>
  );
};

BookingView.propTypes = {
  startDate: PT.string.isRequired,
  endDate: PT.string.isRequired,
  changeStartDate: PT.func.isRequired,
  changeEndDate: PT.func.isRequired,
  submitRequest: PT.func.isRequired,
  updateHoliday: PT.func.isRequired,
  booked: PT.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 50,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  dateForm: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
  },
});

export default BookingView;
