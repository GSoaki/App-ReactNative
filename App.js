import React, { Component} from 'react';
import {StatusBar} from 'react-native'
import {ThemeProvider} from 'styled-components'
import GeneralStatusBarColor from './src/config/GeneralStatusBarColor';
import Routes from './src/routes';

export default class App extends Component {
  render() {
    return (
      <>
      <GeneralStatusBarColor backgroundColor="#000000"
      barStyle="light-content"/>
      <Routes />
      </>
    );
  }
}

