import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { userLogin } from '../../../services/userService';


class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin = () => {
    userLogin(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate('App');
      })
      .catch((e) => {
        console.log(e.message);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email goes here..."
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.input}
          placeholder="Password goes here..."
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          secureTextEntry
        />
        <Button 
          onPress={this.handleLogin}
          title="Login"
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderColor: 'gray',
    height: 40,
    borderWidth: 1,
  },
});

export default LoginView;