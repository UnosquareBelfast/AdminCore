import React from 'react';
import {PropTypes as PT} from 'prop-types';
import { View, Text, Button } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const HomeView = (props) =>
  <View>
    <Calendar />
    <Button
      onPress={props.handleLogout}
      title="Logout"
    />
  </View>;


HomeView.propTypes = {
  handleLogout: PT.func,
};

export default HomeView;
