import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import holidayStatusColor from '../../../utilities/holidayStatus';
import { H4, P } from '../../Common';
import { LIGHTERBLACK, WHITE, LIGHTGREY } from '../../../styles/colors';

const StatusBar = ({ booking }) => {
  const { status, statusId, startDate, endDate } = booking;

  return (
    <View style={[styles.holidayStatus, { backgroundColor: holidayStatusColor[statusId] }]}>
      <H4 style={{ color: WHITE }}>
        {status}
      </H4>
      <P style={{ color: WHITE }}>
        {startDate} to {endDate}
      </P>
    </View>
  );
};

const styles = StyleSheet.create({
  holidayStatus: {
    // backgroundColor: LIGHTGREY,
    // borderBottomWidth: 2,
    // borderLeftColor: '#00DCFA',
    paddingVertical: 10,
    paddingHorizontal: 10,
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
