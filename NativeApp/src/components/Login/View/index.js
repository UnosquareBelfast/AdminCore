import React from 'react';
import LoginForm from '../Form/index';
import Logo from '../../../images/Logo/Logo.png';
import { Image, View, ScrollView } from '../styled';


const LoginView = props => (
  <ScrollView>
    <Image source={Logo} />
    <View card>
      <LoginForm {...props} />
    </View>
  </ScrollView>

);

export default LoginView;
