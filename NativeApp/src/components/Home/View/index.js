import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CustomDay from '../CustomDay';
import { LIGHTGREY, BLACK } from '../../../styles/colors';
import { H3_SIZE } from '../../../styles/text';

const HomeView = (props) => {
  const {
    takenHolidays,
    onDayPress,
    onMonthChange,
  } = props;

  return (
    <View style={styles.container}>
      <Calendar
        style={[styles.calendar]}
        markedDates={takenHolidays}
        markingType="period"
        dayComponent={dayProps => <CustomDay {...dayProps} />}
        theme={{
          monthTextColor: BLACK,
          textMonthFontSize: H3_SIZE,
          textMonthFontWeight: 'bold',
          dayTextColor: BLACK,
          textSectionTitleColor: BLACK,
          'stylesheet.calendar.header': {
            week: {
              marginTop: 7,
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
  takenHolidays: PT.shape({
    text: PT.string,
    color: PT.string,
  }).isRequired,
  onDayPress: PT.func.isRequired,
  onMonthChange: PT.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  calendar: {
    paddingHorizontal: 10,
  },
});

export default HomeView;
