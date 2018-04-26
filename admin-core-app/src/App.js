import React, { Component } from 'react';
import './App.css';
import NavBar from './js/components/navigation/NavBar';
import HomePage from './js/components/home/HomePage';
import LoginPage from './js/components/login/LoginPage';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      jwt: null
    };

    this.attemptLogin = this.attemptLogin.bind(this);
    this.signUserOut = this.signUserOut.bind(this);
  }  

  attemptLogin(email, password){
    const jwt = "thisisavalidjwthaha";
    this.setState({jwt});
  }

  authenticateUser(email, password){
    var that = this;
    if(email && password){

      const loginRequest = {
        email: email,
        password: password
      };

      fetch('/login', { method: 'POST', body: JSON.stringify(loginRequest) }).then(function (response){
        return response;
      }).then(function (result){
        const jwt = result.accessToken;
        that.setState({jwt});
      }).catch(function (err){
        // error handling
      });
    }
  }

  signUserOut(){
    console.log('signUserOut - App.js');
    const jwt = null;
    this.setState({jwt});
  }

  render(){
    return (
      <div className="App">
      {
        this.state.jwt == null ? (
          <LoginPage
            attemptLogin = {this.attemptLogin}/>
        ) : (
          <div>
            <NavBar
              isAdmin={false} 
              isManager={false} 
              isSuper={false}
              signUserOut = {this.signUserOut}
            />
            <HomePage/>
          </div>
        )
      }        
      </div>
    );
  }
}

export default App;

