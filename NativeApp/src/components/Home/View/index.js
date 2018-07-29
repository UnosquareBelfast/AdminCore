import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Button, Icon } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const HomeView = (props) => {
  const {
    handleLogout,
    takenHolidays,
    onDayPress,
  } = props;

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        markedDates={takenHolidays}
        markingType="period"
        theme={{
          todayTextColor: '#00adf5',
        }}
        onDayPress={(day) => { onDayPress(day); }}
      />

      <Button
        onPress={handleLogout}
        title="Logout"
      />
      <Icon
        name="add"
        reverse
        color="red"
        size={30}
      />
    </View>
  );
};

HomeView.propTypes = {
  handleLogout: PT.func.isRequired,
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
    paddingTop: 150,
    backgroundColor: '#fff',
  },
  calendar: {
    paddingHorizontal: 10,
  },
});

export default HomeView;
