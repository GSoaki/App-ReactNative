import React, { Component } from 'react';
import GeneralStatusBarColor from './src/config/GeneralStatusBarColor';
import Routes from './src/routes';

export default class App extends Component {
  render() {
    return (
      <>
      <GeneralStatusBarColor backgroundColor="#4682b4"
      barStyle="light-content"/>
      <Routes />
      </>
    );
  }
}

