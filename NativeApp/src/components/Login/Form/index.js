import React, { Component } from 'react';
import {
  Button,
  FormValidationMessage,
  FormLabel,
} from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Input from '../Input';
import { UNOBLUE } from '../../../styles/colors';


class LoginForm extends Component {
  static propTypes = {
    handleLogin: PT.func.isRequired,
    hasError: PT.bool.isRequired,
    loading: PT.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { email, password } = this.state;
    const { handleLogin, hasError, loading } = this.props;
    return (
      <View style={styles.view}>
        <View>
          <FormLabel>Email</FormLabel>
          <Input
            onChangeText={text => this.setState({ email: text })}
            value={email}
            returnKeyType="next"
            hasError={hasError}
            onSubmitEditing={() => this.secondInput.focus()}
            blurOnSubmit={false}
          />
          <FormLabel>Password</FormLabel>
          <Input
            textInputRef={(ref) => { this.secondInput = ref; }}
            onChangeText={text => this.setState({ password: text })}
            value={password}
            returnKeyType="done"
            hasError={hasError}
            secureTextEntry
            onSubmitEditing={() => handleLogin(email, password)}
          />
          {
            hasError && (
              <FormValidationMessage>Incorrect email or password</FormValidationMessage>
            )
          }
        </View>
        <Button
          onPress={() => handleLogin(email, password)}
          title="Log In"
          backgroundColor={UNOBLUE}
          borderRadius={5}
          containerViewStyle={{ marginVertical: 20 }}
          loading={loading}
          loadingRight
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default LoginForm;
