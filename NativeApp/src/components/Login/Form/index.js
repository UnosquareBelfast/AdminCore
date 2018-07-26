import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Text, TextInput, TouchableOpacity, View } from '../styled';


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
      <View>
        <TextInput
          id="input-1"
          onFocus={() => changeColor('input-1', '#00DCFA')}
          onBlur={() => changeColor('input-1', 'gray')}
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
          placeholder="Password"
          onChangeText={text => this.setState({ password: text })}
          value={password}
          secureTextEntry
          underlineColorAndroid={hasError ? 'red' : underlineColor2}
          selectionColor="#00DCFA"
        />
        {
          hasError && (
            <Text validationText>
              Incorrect email or password
            </Text>
          )
        }
        <TouchableOpacity
          onPress={() => handleLogin(email, password)}
        >
          <Text>
            Log in to Holiday Tracker
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginForm;
