import React from 'react';
import { Image, StyleSheet } from 'react-native';
import LoginForm from '../Form/index';
import Logo from '../../../images/Logo/Logo.png';
import { ScrollView, CardContainer } from '../../Common';

const LoginView = props => (
  <ScrollView>
    <Image source={Logo} style={styles.image} />
    <CardContainer>
      <LoginForm {...props} />
    </CardContainer>
  </ScrollView>

);
const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 220,
    alignSelf: 'center',
    marginTop: 80,
  },
});
export default LoginView;


