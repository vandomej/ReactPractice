import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function IfThen(props) {
  return (
    <div>
      IfThen
    </div>
  );
}

function Todo(props) {
  return (
    <div>
      Todo
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div>
        <Todo />
        <IfThen />
      </div>
    );
  }
}

export default App;
