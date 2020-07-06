import React from 'react'
import {TouchableHighlight,Text} from 'react-native'

const ThemeSwitcher = ({toggleTheme}) => (
    <TouchableHighlight onPress={toggleTheme}><Text></Text></TouchableHighlight>
)

export default ThemeSwitcher;