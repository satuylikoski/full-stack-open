import React, { Component } from 'react';
import './App.css';

import PhoneNumbers from './containers/PhoneNumbers';
import Countries from './containers/Countries';

class App extends Component {
  render() {
    return (
      <>
        <h1>Full Stack Open 2020 course</h1>

        <h2>Phone numbers </h2>
        <PhoneNumbers />

        <h2>Countries</h2>
        <Countries />
      </>
    );
  }
}

export default App;
