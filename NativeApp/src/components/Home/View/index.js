import React from 'react';
import { PropTypes as PT } from 'prop-types';
// import { Icon } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

const HomeView = (props) => {
  const {
    takenHolidays,
    onDayPress,
  } = props;

  return (
    <View style={styles.container}>
      <CalendarList
        style={styles.calendar}
        markedDates={takenHolidays}
        markingType="period"
        theme={{
          todayTextColor: '#00adf5',
          'stylesheet.calendar.header': {
            week: {
              marginTop: 7,
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: 'white',
              shadowRadius: 2,
              shadowOffset: {
                width: 0,
                height: -6 ,
              },
              shadowColor: 'grey',
              shadowOpacity: 1.0,
              elevation: 4,
            },
          },
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
