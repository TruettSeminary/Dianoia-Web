import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import Badge from './material-ui/Badge/Badge'

class App extends Component {

  something() {
    console.log('Hello world'); 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <button onClick={this.something}>Click me! </button> 
        </div>
        {/* <Badge>ABCDEFG!!!</Badge> */}
      </div>
    );
  }
}

export default App;
