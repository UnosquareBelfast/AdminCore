import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native'; 

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
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
  },
});

export default LoginForm;