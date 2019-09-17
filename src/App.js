import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rooms from './components/Rooms';
import Login from './components/Login';
import './components/assets/login.css'
import SignUp from './components/SignUp';
import LogSignUp from './components/LogSignUp';

class App extends Component {
  render() {
    return(
      <div className="App-header">
        {/* <Login/> */}
        <LogSignUp webSocket={this.props.webSocket} />
      </div>
    );
  } 
}

export default App;
