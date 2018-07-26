import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Entypo';


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

      <TouchableOpacity
        style={styles.circleButton}
        // onPress={() => {  }}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
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
  circleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: 'red',
    borderRadius: 70,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});

export default HomeView;
