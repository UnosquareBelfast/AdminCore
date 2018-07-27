import React from 'react';
import LoginForm from '../Form/index';
import Logo from '../../../images/Logo/Logo.png';
import { ScrollView, CardContainer, Image } from '../../Common';

const LoginView = props => (
  <ScrollView>
    <Image source={Logo} />
    <CardContainer>
      <LoginForm {...props} />
    </CardContainer>
  </ScrollView>

);

export default LoginView;
