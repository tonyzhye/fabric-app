import React, { Component } from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import logo from './logo.svg';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <br />
          <DefaultButton
            text="I am Default Button"
            primary={true}
          />
          <br />
        </header>
      </div>
    );
  }
}

export default App;
