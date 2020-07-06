import React from 'react'

import Home from './pages/Home';
import Game from './pages/Game';
import Decks from './pages/Decks';
import Players from './pages/Players'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const icons = {
    Players: {
        lib: Ionicons,
        name: 'md-person-add'
    },
    Home: {
        lib: Ionicons,
        name: 'md-home'
    },
    Decks: {
        lib: MaterialCommunityIcons,
        name: 'cards-outline'
    }
}

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function TabStack() {
    return (
        <Tab.Navigator
            initialRouteName="Players"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const { lib: Icon, name } = icons[route.name];
                    return <Icon name={name} size={size} color={color} />
                }
            })}
            tabBarOptions={{
                activeTintColor: '#070',
                inactiveTintColor: '#fff',
                activeBackgroundColor: '#000',
                inactiveBackgroundColor: '#000'
            }}>
            <Tab.Screen
                options={{
                    title: 'Jogadores'
                }}
                name="Players"  component={Players} />

            <Tab.Screen
                options={{
                    title: 'Home'
                }}
                name="Home"   component={Home} />

            <Tab.Screen
                options={{
                    title: 'Baralhos'
                }}
                name="Decks"  component={Decks} />

        </Tab.Navigator>
    );
}


export default function Routes() {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Play" component={TabStack} />
                <Stack.Screen name="Game" component={Game} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}



