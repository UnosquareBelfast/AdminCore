import React, { Fragment } from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import { CheckBox, FormLabel } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import styles from './styles';
import { CustomDatePicker } from '../../Common';
import StatusBar from '../StatusBar';
import RequestButton from '../RequestButton';
import EventTypeGroup from '../EventTypeGroup';

const BookingView = (props) => {
  const {
    changeStartDate,
    booking,
    booked,
    updateHoliday,
    cancelHoliday,
    changeEndDate,
    submitRequest,
    updateHalfDay,
    loading,
  } = props;
  const { startDate, endDate, halfDay } = booking;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {booked && <StatusBar booking={booking} />}
      <EventTypeGroup />
      <View style={styles.dateForm}>
        <CheckBox
          title="Request half day"
          checked={halfDay}
          size={20}
          checkedIcon="check-circle"
          uncheckedIcon="circle-o"
          onPress={updateHalfDay}
          containerStyle={styles.checkBox}
          textStyle={styles.checkText}
        />
        <View>
          <FormLabel labelStyle={styles.formLabel}>
            Start Date
          </FormLabel>
          <CustomDatePicker
            chosenDate={startDate}
            setDate={changeStartDate}
          />

          { !halfDay && (
            <Fragment>
              <FormLabel labelStyle={styles.formLabel}>
                End Date
              </FormLabel>
              <CustomDatePicker
                chosenDate={endDate}
                setDate={changeEndDate}
                minimumDate={startDate}
              />
            </Fragment>
          )}
        </View>
        <RequestButton
          updateHoliday={updateHoliday}
          cancelHoliday={cancelHoliday}
          submitRequest={submitRequest}
          booked={booked}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

BookingView.propTypes = {
  changeStartDate: PT.func.isRequired,
  changeEndDate: PT.func.isRequired,
  submitRequest: PT.func.isRequired,
  updateHoliday: PT.func.isRequired,
  cancelHoliday: PT.func.isRequired,
  booked: PT.bool.isRequired,
  updateHalfDay: PT.func.isRequired,
  booking: PT.shape({
    holId: PT.number,
    statusId: PT.number,
    status: PT.string,
    startDate: PT.string,
    endDate: PT.string,
    halfDay: PT.bool,
  }).isRequired,
  loading: PT.bool.isRequired,
};

export default BookingView;
