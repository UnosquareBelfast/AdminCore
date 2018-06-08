import React  from 'react';
import { View } from 'react-native';
import LoginForm from '../Form/index';


const LoginView = (props) =>
  <View>
    <LoginForm {...props} />
  </View>;

export default LoginView;