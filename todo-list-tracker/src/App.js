import React, { Component } from 'react';
import './App.css';
import Extension from './components/Extension';

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
  },
  {
    firstName: 'Guy',
    lastname: 'Person'
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
        <h2>Correct Counters</h2>
        <CorrectCounter increment={(this.state.increment % 2) + 1} />
        <CorrectCounter increment={(this.state.increment % 4) + 1} />
        <CorrectCounter increment={(this.state.increment % 6) + 1} />
        <br />
        <h2>Incorrect Counters</h2>
        <IncorrectCounter increment={(this.state.increment % 1) + 1} />
        <IncorrectCounter increment={(this.state.increment % 3) + 1} />
        <IncorrectCounter increment={(this.state.increment % 5) + 1} />
      </div>
    );
  }
}

//Basic ToggleButton
class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };

    //The bind function is used so that you can bind a value to the keyword
    //'this'. Meaning that when you use .bind on a function, the argument that
    //you pass into .bind, gets set to the this keyword. In addition to this,
    //You can pass in other values and they will take over the existing
    //in order.
    this.handleClick = this.handleClick.bind(this, 3);

    //If you don't want to bind every function that you create in a class
    //then you can define it this way.
    //handleClick = increment => {}
    //Apparently this syntax is experimental
    //I would reccomend that you just bind it for now.
  }

  //There are different types of anonymous functions, not types
  //but different ways to express the same anonymous functions

  //Typical function that you would think of, defining the arguments
  //in a parameter list and containing a regular function body
  fun1 = (arg1, arg2, arg3) => {
    //Statements
    var returnValue = arg1 + arg2 + arg3;
    return returnValue;
  };

  //If the only statement in your function is a return statement, then you
  //can change the curly braces to parenthesis and omit the return statement
  fun2 = (arg1, arg2, arg3) => (
    arg1 + arg2 + arg3
  );

  //Lastly, if you only have one argument, then you can omit the parenthesis
  //around the argument.
  fun3 = arg => (arg + 2);

  handleClick(increment) {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedin: false};
  }

  handleLoginClick() {
    console.log('in login click');
    this.setState({isLoggedin: true});
  }

  handleLogoutClick() {
    console.log('in logout click');
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
}

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      {/*You can use the && operator to conditionally render components*/}
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }

      {/*Or you can use the ? operator*/}
      You have {unreadMessages.length > 0 ? unreadMessages.length : 'no'} unread messages
    </div>
  )
}

//If you don't want a component to render, you can return null istead of the render output
function ReturnNull(props) {
  if (!props.render) {
    return null;
  } else {
    return (
      <div>
        The null component is rendering.
      </div>
    );
  }
}

function ConditionalRendering() {
  return (
    <div>
        <Mailbox unreadMessages={[]} />
        <Mailbox unreadMessages={[1,2,3,4]} />
        First: <br />
        <ReturnNull render={false}/>
        Second: <br />
        <ReturnNull render={true}/>
      </div>
  );
}

//Handling Multiple Inputs
class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  //In this class, we have both inputs calling this function
  //in their onChange attributes. In order to handle the value
  //binding, both of the input tags provide attributes that are
  //then binded to the event.target object. That is why we can
  //access the values of type, checked, and name.
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }); 
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

//Basic overarching class
class App extends Component {
  render() {
    return (
      <div style={{margin: '25px'}}>
        {element}
        <LoginControl />
        <CurrentTime name={user[0].firstName}/>
        <Counterlist />
        <ToggleButton />
        <ConditionalRendering />
        <Reservation />
        <Extension />
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
