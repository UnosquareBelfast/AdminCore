import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import holidayStatusColor from '../../../utilities/holidayStatus';

const StatusBar = ({ booking }) => {
  const { status, statusId, startDate, endDate } = booking;

  return (
    <View style={[styles.holidayStatus, { borderLeftColor: holidayStatusColor[statusId] }]}>
      <Text>
        {status}
      </Text>
      <Text>
        {startDate} to {endDate}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  holidayStatus: {
    backgroundColor: '#f7f7f7',
    borderLeftWidth: 10,
    borderLeftColor: '#00DCFA',
    padding: 10,
    marginTop: 20,
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
