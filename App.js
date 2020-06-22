import React from 'react';
import {ThemeProvider} from 'styled-components'
import GeneralStatusBarColor from './src/config/GeneralStatusBarColor';
import Routes from './src/routes';

import themes from './src/config/themes'

export default function App(){
  
    return (
      <ThemeProvider theme={themes.light}>
      <GeneralStatusBarColor backgroundColor="#000000"
      barStyle="light-content"/>
      <Routes />
      </ThemeProvider>
    );
  
} 

