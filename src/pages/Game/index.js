import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View,AsyncStorage} from 'react-native';
import { Icon} from 'react-native-elements'

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import * as data from '../../game/Basic.json';

import styles from '../../styles/styles';

const color = ["white", 'blue', 'red', 'green', 'yellow', 'pink', 'purple', 'orange', 'grey']


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Game({ navigation }) {

    const [cardTitle, setCardTitle] = useState('');
    const [card, setCard] = useState('');
    const [card2, setCard2] = useState('');
    const [players, setPlayers] = useState('');
    const [playerNumber, setPlayerNumber] = useState(0);
    const [randomPlayer, setPlayerRandomNumber] = useState(0);
    const [randomPlayer2, setPlayer2RandomNumber] = useState(0);
    const [playDeck, setPlayDeck] = useState('')
  
    const p = navigation.getParam('players')
    const playerNum = p.length

    var arr = data.cards
    
    useEffect(() => {
        getPlayDeck()
    }, []);

    const getPlayDeck = async() =>{
        return await AsyncStorage.getItem('playDeck')
        .then(req => JSON.parse(req))
        .then(json => setPlayDeck(json))
        .catch(error => console.log('error!'))
    }

    const changeCard = () => {


        setPlayers(p)
        setPlayerNumber(playerNum)
        let newCard = getRandomIntInclusive(0, arr.length)
        newCard = getRandomIntInclusive(0, arr.length)
        var newPlayer = getRandomIntInclusive(0, playerNumber - 1)

        for (var item of arr) {

            if (item.id == newCard) {
                setCardTitle(item.Title)
                setCard(item.text)
                setCard2(item.text2)

                if (item.playerNumber == 0) {
                    setPlayerRandomNumber('')
                    setPlayer2RandomNumber('')
                }
                else if (item.playerNumber == 1) {
                    setPlayerRandomNumber(newPlayer)
                    setPlayer2RandomNumber('')
                }
                else if (item.playerNumber == 2) {
                    var newPlayer2 = getRandomIntInclusive(0, playerNumber - 1)
                    setPlayerRandomNumber(newPlayer)
                    setPlayer2RandomNumber(newPlayer2)
                }
               

            }

        }
    }

    return (

        <View style={[gameStyles.container, styles.container]} contentContainerStyle={styles.contentContainer}>

            <TouchableWithoutFeedback onPress={() => changeCard()} style={gameStyles.card}>
                <View style={[card == '' ? { display: 'flex' } : { display: 'none' }, { alignSelf: 'center' }]}>
                    <Icon
                        reverse
                        name='md-help'
                        type='ionicon'
                        color='#000000'
                        size={100}

                    />
                </View>
                <View style={[{ height: '80%', justifyContent: 'center' }, card != '' ? { display: 'flex' } : { display: 'none' }]}>
                    <Text style={[gameStyles.cardText, { fontSize: 25, color: 'white' }]}>{cardTitle}</Text>
                    <Text style={[gameStyles.cardText, { color: color[randomPlayer] }]}>{players[randomPlayer]}</Text>
                    <Text style={gameStyles.cardText}>{card}</Text>
                    <Text style={[gameStyles.cardText, { color: color[randomPlayer2] }]}>{players[randomPlayer2]}</Text>
                    <Text style={gameStyles.cardText}>{card2}</Text>
                </View>

                <Text style={{ color: '#ffffff', fontSize: 12, textAlignVertical: 'bottom', textAlign: 'center' }}>Clique ou deslize para Jogar</Text>
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
        backgroundColor: '#000000',
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
        padding:20
    },
    cardText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});



