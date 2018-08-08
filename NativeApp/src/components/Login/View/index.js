import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginForm from '../Form/index';
import Logo from '../../../images/Logo/Logo.png';
import { CardContainer } from '../../Common';
import { container } from '../../../styles/layout';

const LoginView = props => (
  <KeyboardAwareScrollView
    style={{ backgroundColor: 'white' }}
    contentContainerStyle={styles.container}
    enableOnAndroid
  >
    <Image source={Logo} style={styles.image} />
    <CardContainer>
      <LoginForm {...props} />
    </CardContainer>
  </KeyboardAwareScrollView>
);
const styles = StyleSheet.create({
  container: {
    ...container,
  },
  image: {
    height: 100,
    width: 220,
    alignSelf: 'center',
    marginTop: 60,
  },
});
export default LoginView;
