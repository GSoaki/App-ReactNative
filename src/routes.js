import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Play from './pages/Play';
import Game from './pages/Game';
import Decks from './pages/Decks';


const screens = {
    Play: Play,
    Game: Game,
    Decks: Decks,
}


const Routes = createAppContainer(
    createStackNavigator(screens,{defaultNavigationOptions:{
        headerStyle:{backgroundColor:'#111b2c',height:70},
        headerTintColor:'white',
    }}
    ),

);

export default Routes;