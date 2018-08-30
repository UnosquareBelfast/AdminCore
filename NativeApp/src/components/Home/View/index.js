import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CustomDay from '../CustomDay';
import { LIGHTGREY, ACTIVECOLOR, BLACK } from '../../../styles/colors';
import { H1_SIZE } from '../../../styles/text';
import { container } from '../../../styles/layout';

const HomeView = (props) => {
  const {
    events,
    onDayPress,
    onMonthChange,
  } = props;

  return (
    <View style={styles.container}>
      <Calendar
        style={[styles.calendar]}
        markedDates={events}
        markingType="period"
        dayComponent={dayProps => <CustomDay {...dayProps} />}
        theme={{
          textMonthFontFamily: 'oswaldRegular',
          textDayFontFamily: 'openSansLight',
          textDayHeaderFontFamily: 'openSansRegular',
          textMonthFontSize: H1_SIZE,
          todayTextColor: ACTIVECOLOR,
          arrowColor: ACTIVECOLOR,
          monthTextColor: BLACK,
          dayTextColor: BLACK,
          textSectionTitleColor: BLACK,
          'stylesheet.calendar.header': {
            week: {
              marginTop: 20,
              paddingBottom: 13,
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderBottomWidth: 1,
              borderColor: LIGHTGREY,
            },
          },
        }}
        onDayPress={day => onDayPress(day)}
        onMonthChange={month => onMonthChange(month)}
      />
    </View>
  );
};

HomeView.propTypes = {
  events: PT.shape({
    text: PT.string,
    color: PT.string,
  }).isRequired,
  onDayPress: PT.func.isRequired,
  onMonthChange: PT.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    ...container,
  },
  calendar: {
    paddingHorizontal: 10,
  },
});

export default HomeView;
