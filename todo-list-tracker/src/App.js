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
//===============/

//Functional Component example
function Introduction(props) {
  return (
    <div>
      Hello from CurrentTime {props.name}
    </div>
  );
}

//Clock Counting class with state
class CurrentTime extends Component {
  //Constructor initializes date as belonging to the state
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  /*
  //  Both of the following methods are called lifecycle hooks, as they run
  //  both after the output has been rendered and before, hooking onto critical
  //  moments in the lifestyle of the component
  */

  //Mounting is when the component is rendered by react to the DOM
  //runs after the component has been rendered. I use it to set up a timer
  componentDidMount() {
    //The value is stored in timerID because state should only be used for
    //values that are actually rendered onto the screen, and props is set up
    //by react itself. If you have a value that you need to store that is not
    //rendered to the screen, you are free to add them to the class itself.
    //In other words, if you don't use an object in render, it shouldn't be in
    //state.
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  //UnMounting is when the Dom produced by react is removed
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  //Used to set the new state on a timer interval
  tick() {
    this.setState({
      date: new Date()
    });
  }

  //Render the dang thing
  render() {
    return (
      <div>
        <Introduction />
        <br />
        Current time is: {this.state.date.toLocaleTimeString()}
      </div>
    );
  }
}

//Counter used to increment on a timer, also used to demonstrate asynchronosity
//of states
class CorrectCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  //Mounting is when the component is rendered by react to the DOM
  //runs after the component has been rendered. I use it to set up a timer
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  //UnMounting is when the Dom produced by react is removed
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //This would not work properly since setState is asynchronous,
    //this.props and this.state may be updated asynchronously.
    //this.setState({
    //  counter: this.state.counter + this.props.increment
    //})

    //This is the correct way to do it
    this.setState(function(prevState, props) {
      return {
        counter: prevState.counter + props.increment
      };
    })
  }

  render() {
    return (
      <div>
        Count: {this.state.counter} Increment: {this.props.increment}
      </div>
    );
  }
}

//Counter used to increment on a timer, also used to demonstrate asynchronosity
//of states
class IncorrectCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  //Mounting is when the component is rendered by react to the DOM
  //runs after the component has been rendered. I use it to set up a timer
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  //UnMounting is when the Dom produced by react is removed
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //This would not work properly since setState is asynchronous,
    //this.props and this.state may be updated asynchronously.
    this.setState({
      counter: this.state.counter + this.props.increment
    })

    //This is the correct way to do it
    /*this.setState(function(prevState, props) {
      return {
        counter: prevState.counter + props.increment
      };
    })*/
  }

  render() {
    return (
      <div>
        Count: {this.state.counter} Increment: {this.props.increment}
      </div>
    );
  }
}

//Used to contain a list of various counters
class Counterlist extends Component {
  constructor(props) {
    super(props);
    this.state = { increment: 1 };
  }

  //Mounting is when the component is rendered by react to the DOM
  //runs after the component has been rendered. I use it to set up a timer
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      9998
    );
  }

  //UnMounting is when the Dom produced by react is removed
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //This would not work properly since setState is asynchronous,
    //this.props and this.state may be updated asynchronously.
    //this.setState({
    //  counter: this.state.counter + this.props.increment
    //})

    //This is the correct way to do it
    this.setState(function(prevState, props) {
      return {
        increment: Math.floor(Math.random() * 20)
      };
    })
  }

  render() {
    return (
      <div>
        <CorrectCounter increment={(this.state.increment % 2) + 1} />
        <CorrectCounter increment={(this.state.increment % 4) + 1} />
        <CorrectCounter increment={(this.state.increment % 6) + 1} />
        <br />
        <IncorrectCounter increment={(this.state.increment % 1) + 1} />
        <IncorrectCounter increment={(this.state.increment % 3) + 1} />
        <IncorrectCounter increment={(this.state.increment % 5) + 1} />
      </div>
    );
  }
}

//Basic overarching class
class App extends Component {
  render() {
    return (
      <div>
        {element}
        <CurrentTime name={user[0].firstName}/>
        <Counterlist />
      </div>
    );
  }
}

 /* Non react javascript */
//=======================/

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

export default App;
