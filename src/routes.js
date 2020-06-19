import React from 'react'
import {Image} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './pages/Play';
import Game from './pages/Game';
import Decks from './pages/Decks';

import logo from './../assets/images/iconWhite.png'


const screens = {
    Home:{
        screen:Home,
        navigationOptions:{
            headerTitle:'Drink Game',
            headerTitleStyle:{alignSelf:'center'},
            headerRight:(()=><Image style={{height:35,width:35,marginRight:75}} source={logo}/>)
        }    
    },
    Game:{
        screen:Game,
        navigationOptions:{
            headerTitle:'',
        }    
    },
    Decks:{
        screen:Decks,
        navigationOptions:{
            headerTitle:'Baralhos',
        }    
    },
}


const Routes = createAppContainer(
    createStackNavigator(screens,{defaultNavigationOptions:{
        headerStyle:{backgroundColor:'#000000',height:100},
        headerTintColor:'white',
    }}
    ),

);

export default Routes;