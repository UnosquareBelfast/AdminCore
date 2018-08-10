import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import holidayStatusColor from '../../../utilities/holidayStatus';
import { H3 } from '../../Common';
import { LIGHTGREY } from '../../../styles/colors';

const StatusBar = ({ booking }) => {
  const { status, statusId, startDate, endDate } = booking;

  return (
    <View style={[styles.holidayStatus, { backgroundColor: holidayStatusColor[statusId] }]}>
      <H3 style={{ textAlign: 'center', color: 'white'}}>
        {status}
      </H3>
      {/* <Text>
        {startDate} to {endDate}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  holidayStatus: {
    backgroundColor: LIGHTGREY,
    // borderLeftWidth: 3,
    // borderLeftColor: '#00DCFA',
    padding: 10,
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
};
