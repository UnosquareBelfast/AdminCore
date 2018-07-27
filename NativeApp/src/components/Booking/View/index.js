import React, { Fragment } from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import styles from './styles';
import { CustomDatePicker } from '../../Common';
import holidayStatusColor from '../../../utilities/holidayStatus';

const BookingView = (props) => {
  const {
    startDate,
    changeStartDate,
    endDate,
    booked,
    updateHoliday,
    changeEndDate,
    submitRequest,
    halfDay,
    updateHalfDay,
    statusId,
    status,
  } = props;

  const renderButton = booked
    ? (
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => updateHoliday(false)}
          title="Update Holiday"
          backgroundColor="#00DCFA"
          borderRadius={5}
        />
        <Button
          onPress={() => updateHoliday(true)}
          title="Cancel Holiday"
          containerViewStyle={{ marginTop: 20 }}
          borderRadius={5}
        />
      </View>
    )
    : (
      <Button
        onPress={submitRequest}
        title="Request"
        backgroundColor="#00DCFA"
        borderRadius={5}
      />
    );

  const renderStatusBar = booked
    ? (
      <View style={[styles.holidayStatus, { borderLeftColor: holidayStatusColor[statusId] }]}>
        <Text>
          {status}
        </Text>
        <Text>
          {startDate} to {endDate}
        </Text>
      </View>
    ) : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>
        I would like to
        {booked ? ' update ' : ' request '}
        the following holiday/s:
      </Text>

      {renderStatusBar}

      <View style={styles.dateForm}>
        <View>
          <Text>
            Start Date:
          </Text>
          <CustomDatePicker
            chosenDate={startDate}
            setDate={changeStartDate}
          />

          { !halfDay && (
            <Fragment>
              <Text>
                End Date:
              </Text>
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
            onPress={updateHalfDay}
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
  halfDay: PT.bool.isRequired,
  updateHalfDay: PT.func.isRequired,
  statusId: PT.number,
  status: PT.string,
};

BookingView.defaultProps = {
  status: '',
  statusId: 0,
};

export default BookingView;
