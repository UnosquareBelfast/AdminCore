import React  from 'react';
import { PropTypes as PT } from 'prop-types';
import { ScrollView, View, Text, StyleSheet } from 'react-native';


const UserView = (props) =>
  <ScrollView
    contentContainerStyle={styles.container}
  >
    <View>
      <Text>Holidays taken</Text>
      <Text>{props.takenHolidays}</Text>
      <Text>Holidays remaining</Text>
      <Text>0</Text>
    </View>
  </ScrollView>;

UserView.propTypes = {
  takenHolidays: PT.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
});

export default UserView;
