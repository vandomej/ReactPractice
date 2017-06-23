import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const user = [
  {
    firstName: 'Jacob',
    lastName: 'VanDomelen'
  },
  {
    firstName: 'Dan',
    lastName: 'VanHorn'
  },
  {
    firstName: 'Nathan',
    lastName: 'Tan'
  }
];

const headerStyle = {
  maxWidth: Math.floor((Math.random() * 100) + 1) + ' px'
};

const element = (
  <h1 style={headerStyle}>
    Hello, {formatName(user[0])} [{(Math.floor(Math.random() * 1000) + 7) % 11}]
  </h1>
);

/* react region */
//==============/

//Functional component example
function CurrentTime(props) {
  return (
    <div>
      Hello from CurrentTime {props.name}
      <br />
      Current time is: {new Date().toLocaleTimeString()}
    </div>
  );
}

//Basic overarching class
class App extends Component {
  render() {
    console.log(headerStyle);
    return (
      <div>
        {element}
        <CurrentTime name={user[0].firstName}/>
      </div>
    );
  }
}

/* Non react javascript */
//======================/

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

export default App;
