import React  from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';


const UserView = () =>
  <ScrollView
    contentContainerStyle={styles.container}
  >
    <View>
      <Text>Holidays taken</Text>
      <Text>0</Text>
      <Text>Holidays remaining</Text>
      <Text>0</Text>
    </View>
  </ScrollView>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
});

export default UserView;
