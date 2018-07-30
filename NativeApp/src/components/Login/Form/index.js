import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { TextInput, Caption } from '../../Common';

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
          underlineColorAndroid="transparent"
          selectionColor="#00DCFA"
          style={{ borderBottomWidth: 1, borderColor: hasError ? 'red' : underlineColor1 }}
        />
        <TextInput
          id="input-2"
          onFocus={() => changeColor('input-2', '#00DCFA')}
          onBlur={() => changeColor('input-2', 'gray')}
          placeholder="Password"
          onChangeText={text => this.setState({ password: text })}
          value={password}
          secureTextEntry
          underlineColorAndroid="transparent"
          style={{ borderBottomWidth: 1, borderColor: hasError ? 'red' : underlineColor2 }}
          selectionColor="#00DCFA"
        />
        {
          hasError && (
            <Caption type="base" styleProp={styles.red}>
              Incorrect email or password
            </Caption>
          )
        }
        <Button
          onPress={() => handleLogin(email, password)}
          title="Log in to Holiday Tracker"
          textStyle={{ fontWeight: 'bold', color: '#fff', fontSize: 20 }}
          backgroundColor="#00DCFA"
          containerViewStyle={{ marginTop: 30 }}
          borderRadius={5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  red: {
    color: 'red',
    paddingHorizontal: 5,
  },
});

export default LoginForm;
