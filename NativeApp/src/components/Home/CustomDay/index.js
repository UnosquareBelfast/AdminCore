import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import Day from 'react-native-calendars/src/calendar/day/custom';
import holidayStatusColor from '../../../utilities/holidayStatus';

const CustomDay = (props) => {
  const { marking: { halfDay, statusId } } = props;

  const HalfDay = () => {
    if (!halfDay) {
      return null;
    }

    return (
      <View style={[styles.halfDay, { backgroundColor: holidayStatusColor[statusId] }]} />
    );
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: halfDay ? 'transparent' : holidayStatusColor[statusId] }]}>
      <HalfDay />
      <Day {...props} />
    </View>
  );
};

CustomDay.propTypes = {
  marking: PT.oneOfType([
    PT.array,
    PT.object,
  ]).isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginLeft: -1,
  },
  halfDay: {
    width: '50%',
    height: '100%',
    left: 0,
    position: 'absolute',
  },
});

export default CustomDay;
