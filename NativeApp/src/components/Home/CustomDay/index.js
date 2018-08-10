import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import Day from 'react-native-calendars/src/calendar/day/custom';
import holidayStatusColor from '../../../utilities/holidayStatus';

const CustomDay = (props) => {
  const { marking: { halfDay, statusId, startingDate, endingDate } } = props;

  const HalfDay = () => {
    if (!halfDay) {
      return null;
    }

    return (
      <View style={styles.halfDayContainer}>
        <View style={
          [
            styles.halfDay,
            {
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              backgroundColor: holidayStatusColor[statusId],
            },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.fillers}>
        <View
          style={[
            styles.leftFiller,
            endingDate && { backgroundColor: holidayStatusColor[statusId] },
          ]}
        />
        <View
          style={[
            styles.rightFiller,
            startingDate && { backgroundColor: holidayStatusColor[statusId] },
          ]}
        />
      </View>
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
  halfDayContainer: {
    width: 32,
    height: 32,
    position: 'absolute',
  },
  halfDay: {
    flex: 1,
    width: '50%',
    alignItems: 'flex-start',
  },
  fillers: {
    position: 'absolute',
    height: '100%',
    flexDirection: 'row',
    left: 0,
    right: 0,
  },
  leftFiller: {
    height: '100%',
    flex: 1,
  },
  rightFiller: {
    height: '100%',
    flex: 1,
  },
});

export default CustomDay;
