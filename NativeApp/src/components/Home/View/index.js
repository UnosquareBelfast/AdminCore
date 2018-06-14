import React from 'react';
import {PropTypes as PT} from 'prop-types';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const HomeView = (props) =>
  <View style={styles.container}>
    <Calendar
      style={styles.calendar}
      horizontal={true}
      pagingEnabled={true}
    />
    <Button
      onPress={props.handleLogout}
      title="Logout"
    />
  </View>;


HomeView.propTypes = {
  handleLogout: PT.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  calendar: {
    paddingHorizontal: 10,
  }
})

export default HomeView;
