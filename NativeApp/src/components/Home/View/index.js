import React from 'react';
import {PropTypes as PT} from 'prop-types';
import { View, Button, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

const HomeView = (props) =>
  <View style={styles.container}>
    <Button
      onPress={props.handleLogout}
      title="Logout"
    />
    <CalendarList
      style={styles.calendar}
      pagingEnabled
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
  },
});

export default HomeView;
