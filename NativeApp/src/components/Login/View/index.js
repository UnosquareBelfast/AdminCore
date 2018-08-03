import React from 'react';
import { Image, StyleSheet, ScrollView } from 'react-native';
import LoginForm from '../Form/index';
import Logo from '../../../images/Logo/Logo.png';
import { CardContainer } from '../../Common';
import { container } from '../../../styles/layout';

const LoginView = props => (
  <ScrollView contentContainerStyle={styles.container}>
    <Image source={Logo} style={styles.image} />
    <CardContainer>
      <LoginForm {...props} />
    </CardContainer>
  </ScrollView>

);
const styles = StyleSheet.create({
  container: {
    ...container,
  },
  image: {
    height: 100,
    width: 220,
    alignSelf: 'center',
    marginTop: 80,
  },
});
export default LoginView;


