import React, { Fragment } from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import styles from './styles';
import { CustomDatePicker } from '../../Common';
import StatusBar from '../StatusBar';
import RequestButton from '../RequestButton';

const BookingView = (props) => {
  const {
    changeStartDate,
    booking,
    booked,
    updateHoliday,
    changeEndDate,
    submitRequest,
    updateHalfDay,
  } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>
        I would like to
        {booked ? ' update ' : ' request '}
        the following holiday/s:
      </Text>

      {booked && <StatusBar booking={booking} />}

      <View style={styles.dateForm}>
        <View>
          <Text>
            Start Date:
          </Text>
          <CustomDatePicker
            chosenDate={booking.startDate}
            setDate={changeStartDate}
          />

          { !booking.halfDay && (
            <Fragment>
              <Text>
                End Date:
              </Text>
              <CustomDatePicker
                chosenDate={booking.endDate}
                setDate={changeEndDate}
                minimumDate={booking.startDate}
              />
            </Fragment>
          )}

          <CheckBox
            title="Request half day"
            checked={booking.halfDay}
            onPress={updateHalfDay}
            containerStyle={styles.checkBox}
          />
        </View>
        <RequestButton
          updateHoliday={updateHoliday}
          submitRequest={submitRequest}
          booked={booked}
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
};

export default BookingView;
