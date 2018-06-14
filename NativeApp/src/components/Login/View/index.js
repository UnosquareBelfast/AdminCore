import React  from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import LoginForm from '../Form/index';


const LoginView = (props) =>
  <ScrollView 
    contentContainerStyle={styles.container}
  >
    <View style={styles.card}>
      <LoginForm {...props} />
    </View>
  </ScrollView>;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#1abc9c'
  },
  card: {
    borderWidth: 1,
    borderColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
  }
})

export default LoginView;
