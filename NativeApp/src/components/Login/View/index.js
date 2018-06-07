import React  from 'react';
import { View, Button } from 'react-native';
import { userLogin } from '../../../services/userService';
import LoginForm from '../Form/index';


const LoginView = (props) =>
  <View>
    <LoginForm {...props} />
    <Button 
      onPress={props.handleLogin}
      title="Login"
    />
  </View>;

export default LoginView;