import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const user = {
  firstName: 'Jacob',
  lastName: 'VanDomelen'
};

const headerStyle = {
  maxWidth: Math.floor((Math.random() * 100) + 1) + ' px'
};

const element = (
  <h1 className={headerStyle}>
    Hello, {formatName(user)} [{(Math.floor(Math.random() * 1000) + 7) % 11}]
  </h1>
);

/* react region */
//==============/
class App extends Component {
  render() {
    console.log(headerStyle);
    return (element);
  }
}

/* Non react javascript */
//======================/

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

export default App;
