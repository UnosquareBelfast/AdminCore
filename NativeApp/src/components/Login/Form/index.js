import React, { Component } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { PropTypes as PT } from 'prop-types';

class LoginForm extends Component {
  static propTypes = {
    handleLogin: PT.func.isRequired,
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
    const { handleLogin } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email goes here..."
          onChangeText={text => this.setState({ email: text })}
          value={email}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.input}
          placeholder="Password goes here..."
          onChangeText={text => this.setState({ password: text })}
          value={password}
          secureTextEntry
          underlineColorAndroid="transparent"
        />
        <Button
          onPress={() => handleLogin(email, password)}
          title="Login"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginForm;
