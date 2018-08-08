import React, { Component } from 'react';
import { Button, FormValidationMessage, FormInput, FormLabel } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import { View, StyleSheet } from 'react-native';

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
    const { handleLogin, hasError, loading } = this.props;
    const { changeColor } = this;
    return (
      <View style={styles.view}>
        <View>
          <FormLabel>Email</FormLabel>
          <FormInput
            id="input-1"
            onChangeText={text => this.setState({ email: text })}
            inputStyle={{
              fontSize: 20,
              color: 'black',
              padding: 8,
              borderColor: hasError ? 'red' : underlineColor1,
              borderBottomWidth: 1,
              width: '100%',
            }}
            underlineColorAndroid="transparent"
            selectionColor="#00DCFA"
            placeholder="you@email.com"
            autoCapitalize="none"
            value={email}
            returnKeyType="next"
            onSubmitEditing={() => this.secondInput.focus()}
            onFocus={() => changeColor('input-1', '#00DCFA')}
            onBlur={() => changeColor('input-1', 'gray')}
            blurOnSubmit={false}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            id="input-2"
            textInputRef={(el) => { this.secondInput = el; }}
            onChangeText={text => this.setState({ password: text })}
            inputStyle={{
              fontSize: 20,
              color: 'black',
              padding: 8,
              borderColor: hasError ? 'red' : underlineColor2,
              borderBottomWidth: 1,
              width: '100%',
            }}
            underlineColorAndroid="transparent"
            selectionColor="#00DCFA"
            placeholder="*******"
            autoCapitalize="none"
            value={password}
            secureTextEntry
            returnKeyType="done"
            onFocus={() => changeColor('input-2', '#00DCFA')}
            onBlur={() => changeColor('input-2', 'gray')}
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
          textStyle={{ fontWeight: 'bold', color: '#fff', fontSize: 20 }}
          backgroundColor="#00DCFA"
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
