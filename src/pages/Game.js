import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, AsyncStorage } from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import * as data from './../game/Basic.json';

//import {PlayerList} from '../pages/Play'

import styles from '../styles/styles';


//"https://www.freepik.com/free-photos-vectors/menu" Menu vector created by vectorpocket - www.freepik.com
//Lembrar de atribuir



Shot = () => {
    const shotStyle = {
        width: 30,
        height: 30,
    };
    return <Image
        style={shotStyle}
        source={{
            uri: '../../assets/images/Shot.jpg',
        }}
    />;
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export default function Game({ navigation }) {

    const [card, setCard] = useState('');
    const [players, setPlayers] = useState('');
    const [playerNumber, setPlayerNumber] = useState(0);
    const [randomPlayer, setPlayerRandomNumber] = useState(0);

    const p = navigation.getParam('players')
    const playerNum = navigation.getParam('playerNumber')

    var arr = data.cards
    var novo = 1


    changeCard = () => {

        setPlayers(p)
        setPlayerNumber(playerNum)
        newCard = getRandomIntInclusive(0,5)
        newPlayer = getRandomIntInclusive(1,playerNumber-1)
        console.log(newPlayer)

        for (var item of arr) {

            if (item.id == newCard) {
                setCard(item.text)
                setPlayerRandomNumber(newPlayer)
            }

        }
    }

    return (

        <View style={[gameStyles.container, styles.container]} contentContainerStyle={styles.contentContainer}>

            <TouchableWithoutFeedback onPress={() => changeCard()} style={gameStyles.card}>

                <Text style={gameStyles.cardText}>{card}</Text>
                <Text style={gameStyles.cardText}>{players[randomPlayer]}</Text>

            </TouchableWithoutFeedback>
            
        </View>


    );

}


const gameStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'black',
        height: 400,
        width: 320,
        justifyContent: 'center',
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 20,
    },
    card2: {
        backgroundColor: 'gray',
        height: 10,
        width: 320,
        zIndex: 0,
        top: -2,
        borderBottomWidth: 2,
        borderColor: 'white',
    },
    card3: {
        backgroundColor: 'blue',
        height: 10,
        width: 320,
        zIndex: -1,
        top: -4,
        borderBottomWidth: 2,
        borderColor: 'white',
    },
    card4: {
        backgroundColor: 'red',
        height: 10,
        width: 320,
        zIndex: -2,
        top: -6,
        borderBottomWidth: 2,
        borderColor: 'white',
    },
    cardText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },

});



