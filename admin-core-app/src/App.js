import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './js/components/NavBar';
import HomePage from './js/components/pages/HomePage';
import LoginPage from './js/components/pages/LoginPage';


class App extends Component {
  constructor(props){
    super(props);
  }  

  render(){
    return (
      <div className="App">
      {/* <LoginPage/> */}
        <NavBar
        isAdmin={false} 
        isManager={false} 
        isSuper={false}
        />
        <HomePage/>
      </div>
    );
  }
}

export default App;

