import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import LoginForm from '../Form/index';
import Logo from '../../../images/Logo/Logo.png';


const LoginView = props => (
  <View style={styles.container}>

    <Image style={styles.image} source={Logo} />

    <ScrollView>
      <View style={styles.card}>
        <LoginForm {...props} />
      </View>
    </ScrollView>

  </View>
);


const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  card: {
    borderWidth: 1,
    borderColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  image: {
    height: 100,
    width: 220,
    alignSelf: 'center',
  },
});

export default LoginView;
