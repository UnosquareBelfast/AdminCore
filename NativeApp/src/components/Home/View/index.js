import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import CustomDay from '../CustomDay';

const HomeView = (props) => {
  const {
    takenHolidays,
    onDayPress,
  } = props;

  return (
    <View style={styles.container}>
      <CalendarList
        style={[styles.calendar, { height: 300 }]}
        markedDates={takenHolidays}
        markingType="period"
        dayComponent={dayProps => <CustomDay {...dayProps} />}
        theme={{
          todayTextColor: '#00adf5',
        }}
        onDayPress={(day) => { onDayPress(day); }}
      />

      {/* <Icon
        name="add"
        reverse
        color="red"
        size={30}
      /> */}
    </View>
  );
};

HomeView.propTypes = {
  takenHolidays: PT.shape({
    text: PT.string,
    color: PT.string,
  }).isRequired,
  onDayPress: PT.func.isRequired,
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
