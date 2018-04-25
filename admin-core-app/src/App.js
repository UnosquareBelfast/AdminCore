import React, { Component } from 'react';
import './App.css';
import NavBar from './js/components/NavBar';
import HomePage from './js/components/pages/HomePage';
import LoginPage from './js/components/pages/LoginPage';


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

  signUserOut(){
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

