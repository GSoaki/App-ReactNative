import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';

import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import * as data from '../../game/Basic.json';
import { Wrapper, Card, CardText } from './styles';



const color = ["white", 'blue', 'red', 'green', 'yellow', 'pink', 'purple', 'orange', 'grey']

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Game({ navigation }) {

    const [cardTitle, setCardTitle] = useState('');
    const [cardText, setCardText] = useState('');
    const [cardText2, setCardText2] = useState('');
    const [randomPlayer, setPlayerRandomNumber] = useState(0);
    const [randomPlayer2, setPlayer2RandomNumber] = useState(0);
    
    const [players, setPlayers] = useState('');
    const [playerNumber, setPlayerNumber] = useState(0);

    const [playDeck, setPlayDeck] = useState('')

    const p = navigation.getParam('players')
    const playerNum = p.length

    var arr = data.cards

    useEffect(() => {
        getPlayDeck()
    }, []);

    const getPlayDeck = async () => {
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
                setCardText(item.text)
                setCardText2(item.text2)

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
                    while (newPlayer === newPlayer2) {
                        newPlayer2 = getRandomIntInclusive(0, playerNumber - 1)
                    }
                    setPlayerRandomNumber(newPlayer)
                    setPlayer2RandomNumber(newPlayer2)
                }


            }

        }
    }

    const translateY = new Animated.Value(0);

    const animatedEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationY: translateY,
                }
            }
        ],
        { useNativeDriver: true },
    )

    let offset = 0;

    function onHandlerStateChanged(event) {
        if(event.nativeEvent.oldState == State.ACTIVE){
            const{ translationY } = event.nativeEvent
            let opened = false
            
            offset += translationY;

            if(translationY <= -50){
                opened = true

                Animated.timing(translateY,{
                    toValue: -800,
                    duration: 800,
                    useNativeDriver:true
                }).start();

                Animated.timing(translateY,{
                    duration: 500,
                    toValue: 0,
                    useNativeDriver:true
                }).start(() => changeCard())

            }
            else{
                Animated.timing(translateY,{
                    toValue: 0,
                    duration: 200,
                    useNativeDriver:true
                }).start()
            }
          
        }
    }

    return (
        <Wrapper contentContainerStyle={{ alignText: 'center' }}>

            <PanGestureHandler
                onGestureEvent={animatedEvent}
                onHandlerStateChange={onHandlerStateChanged}

            >
                <Card
                    style={{
                        transform: [{
                            translateY: translateY.interpolate({
                                inputRange: [-900, 0],
                                outputRange: [-900, 0],
                                extrapolate: 'clamp'
                            })
                        }]
                    }}>
                    <TouchableHighlight onPress={() => changeCard()}>
                        <View>
                            <View style={[cardText == '' ? { display: 'flex' } : { display: 'none' }, { alignSelf: 'center' }]}>
                                <Icon
                                    reverse
                                    name='md-help'
                                    type='ionicon'
                                    color='#000000'
                                    size={100}

                                />
                            </View>
                            <View style={[{ height: '80%', justifyContent: 'center' }, cardText != '' ? { display: 'flex' } : { display: 'none' }]}>
                                <CardText style={{ fontSize: 25, color: 'white' }}>{cardTitle}</CardText>
                                <CardText style={{ color: color[randomPlayer] }}>{players[randomPlayer]}</CardText>
                                <CardText >{cardText}</CardText>
                                <CardText style={{ color: color[randomPlayer2] }}>{players[randomPlayer2]}</CardText>
                                <CardText >{cardText2}</CardText>
                            </View>

                            
                        </View>
                    </TouchableHighlight>
                    <Text style={{ color: '#ffffff', fontSize: 12, textAlignVertical: 'bottom', textAlign: 'center' }}>Clique ou deslize para Jogar</Text>
                </Card>
            </PanGestureHandler>

        </Wrapper>
    );

}



