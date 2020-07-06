import React, { Component } from 'react';

import { ThemeProvider } from 'styled-components'

import PlayerProvider from './src/context/playerContext'

import GeneralStatusBarColor from './src/styles/GeneralStatusBarColor';

import Routes from './src/routes';

import themes from './src/styles/themes'

import ThemeContext from './src/styles/themes/context'


export default class App extends Component {
  
  toggleTheme = () => {
    this.setState({
      theme: this.state.theme == themes.dark ? themes.light : themes.dark
    })
  }

  state = {
    theme: themes.dark,
    toggle: this.toggleTheme
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <GeneralStatusBarColor backgroundColor="#000000"
          barStyle="light-content" />
        <ThemeContext.Consumer>
          {theme => (
            <PlayerProvider>
              <ThemeProvider theme={theme}>
                <Routes />
              </ThemeProvider>
            </PlayerProvider>

          )}
        </ThemeContext.Consumer>
      </ThemeContext.Provider>
    )

  };

}

