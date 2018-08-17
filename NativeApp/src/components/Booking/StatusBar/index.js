import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { Icon } from 'react-native-elements';
import holidayStatusColor from '../../../utilities/holidayStatus';
import { H4, P } from '../../Common';
import { WHITE } from '../../../styles/colors';

const StatusBar = ({ booking, cancelHoliday }) => {
  const { status, statusId, startDate, endDate } = booking;
  const RemoveButton = () => {
    if (statusId === 3) {
      return null;
    }

    return (
      <Icon
        type="font-awesome"
        name="times-circle"
        color={WHITE}
        underlayColor="transparent"
        onPress={() => Alert.alert(
          'Cancel booking',
          'Are you sure want to cancel the booking?',
          [
            { text: 'No' },
            { text: 'Yes', onPress: cancelHoliday, style: 'destructive' },
          ],
        )}
      />
    );
  };

  return (
    <View style={[styles.holidayStatus, { backgroundColor: holidayStatusColor[statusId] }]}>
      <View>
        <H4 style={{ color: WHITE }}>
          {status}
        </H4>
        <P style={{ color: WHITE }}>
          {startDate} to {endDate}
        </P>
      </View>

      <RemoveButton />

    </View>
  );
};

const styles = StyleSheet.create({
  holidayStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default StatusBar;

StatusBar.propTypes = {
  booking: PT.shape({
    holId: PT.number,
    statusId: PT.number,
    status: PT.string,
    startDate: PT.string,
    endDate: PT.string,
    halfDay: PT.bool,
  }).isRequired,
  cancelHoliday: PT.func.isRequired,
};
