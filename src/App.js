import React, { Component, Fragment } from 'react';
import './App.css';

import PhoneNumbers from './containers/PhoneNumbers';
import Countries from './containers/Countries';

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>Full Stack Open 2018 course</h1>
        <h2>Phone numbers </h2>
        <PhoneNumbers />
        <h2>Ferching countries all over the world</h2>
        <Countries />
      </Fragment>
    );
  }
}

export default App;
