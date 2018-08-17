import React, { Fragment } from 'react';
import { View, ScrollView } from 'react-native';
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
    <ScrollView
      style={{ backgroundColor: '#f7f7f7' }}
      contentContainerStyle={styles.container}
    >
      {booked && <StatusBar booking={booking} cancelHoliday={cancelHoliday} />}

      <View style={styles.dateForm}>
        <View>
          <FormLabel labelStyle={styles.formLabel}>
            TYPE
          </FormLabel>
          <EventTypeGroup />
        </View>

        <View>
          <FormLabel labelStyle={styles.formLabel}>
            STARTING
          </FormLabel>
          <CustomDatePicker
            chosenDate={startDate}
            setDate={changeStartDate}
          />

          { !halfDay && (
            <Fragment>
              <FormLabel labelStyle={styles.formLabel}>
                ENDING
              </FormLabel>
              <CustomDatePicker
                chosenDate={endDate}
                setDate={changeEndDate}
                minimumDate={startDate}
              />
            </Fragment>
          )}
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
        </View>
      </View>

      <View style={styles.buttonContainer}>
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
