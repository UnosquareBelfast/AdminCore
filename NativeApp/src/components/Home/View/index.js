import React from 'react';
import {PropTypes as PT} from 'prop-types';
import { View, Text, Button } from 'react-native';

const HomeView = (props) =>
  <View>
    <Text>Home scene</Text>
    <Button 
      onPress={props.handleLogout}
      title="Logout"
    />
  </View>;


HomeView.propTypes = {
  handleLogout: PT.func,
};
  
export default HomeView;