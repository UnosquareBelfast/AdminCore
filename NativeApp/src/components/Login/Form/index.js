import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { PropTypes as PT } from 'prop-types';

class LoginForm extends Component {
  static propTypes = {
    handleLogin: PT.func.isRequired,
    hasError: PT.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      underlineColor1: 'gray',
      underlineColor2: 'gray',
    };
  }

  changeColor = (id, color) => {
    if (id === 'input-1') {
      this.setState({
        underlineColor1: color,
      });
    } else {
      this.setState({
        underlineColor2: color,
      });
    }
  }

  render() {
    const { email, password, underlineColor1, underlineColor2 } = this.state;
    const { handleLogin, hasError } = this.props;
    const { changeColor } = this;
    return (
      <View style={styles.container}>
        <TextInput
          id="input-1"
          onFocus={() => changeColor('input-1', '#00DCFA')}
          onBlur={() => changeColor('input-1', 'gray')}
          style={styles.input}
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
          value={email}
          autoCapitalize="none"
          underlineColorAndroid={hasError ? 'red' : underlineColor1}
          selectionColor="#00DCFA"
        />
        <TextInput
          id="input-2"
          onFocus={() => changeColor('input-2', '#00DCFA')}
          onBlur={() => changeColor('input-2', 'gray')}
          style={styles.input}
          placeholder="Password"
          onChangeText={text => this.setState({ password: text })}
          value={password}
          secureTextEntry
          underlineColorAndroid={hasError ? 'red' : underlineColor2}
          selectionColor="#00DCFA"
        />
        {
          hasError && (
            <Text style={styles.validationText}>
              Incorrect email or password
            </Text>
          )
        }
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin(email, password)}
        >
          <Text style={[styles.text]}>
            Log in to Holiday Tracker
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    marginTop: 20,
    paddingHorizontal: 5,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#00DCFA',
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    padding: 8,
    marginTop: 30,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  validationText: {
    color: 'red',
    fontSize: 18,
    paddingHorizontal: 5,
  },
});

export default LoginForm;
