import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage, TouchableHighlight, TouchableOpacity, FlatList, Picker } from 'react-native';

import { Animated } from 'react-native';

import { PanGestureHandler, State } from 'react-native-gesture-handler'

import { Icon, CheckBox } from 'react-native-elements'

import Modal from 'react-native-modalbox';

import * as data from '../../game/Basic.json';
import {
    Wrapper,
    Card,
    CardText,
    CardInfo,
    CardInfoTitle,
    CardInfoText
}
    from './styles';

import { usePlayer } from './../../context/playerContext'

import color from './../../game/color'

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function useForceUpdate() {
    const [value, setValue] = useState(true);
    return () => setValue(!value);
}

export default function Game() {

    const { player } = usePlayer();

    const [cardTitle, setCardTitle] = useState('');
    const [cardText, setCardText] = useState('');
    const [cardText2, setCardText2] = useState('');
    const [randomPlayer, setPlayerRandomNumber] = useState(0);
    const [randomPlayer2, setPlayer2RandomNumber] = useState(0);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [playDeck, setPlayDeck] = useState('')

    const playerNum = player.length

    const forceUpdate = useForceUpdate();

    var arr = data.cards

    useEffect(() => {
        //getPlayDeck()
        for (var i = 0; i < arr.length; i++) {
            arr[i].checked = true
            arr[i].original = true
        }

    }, []);

    /*const getPlayDeck = async () => {
        return await AsyncStorage.getItem('playDeck')
            .then(req => JSON.parse(req))
            .then(json => setPlayDeck(json))
            .catch(error => console.log('error!'))
    }*/

    const changeCard = () => {

        let newCard = getRandomIntInclusive(0, arr.length - 1)
        newCard = getRandomIntInclusive(0, arr.length - 1)

        var newPlayer = getRandomIntInclusive(0, playerNum - 1)

        for (var item of arr) {

            if (item.id == newCard) {
                if (item.checked == true) {
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
                        var newPlayer2 = getRandomIntInclusive(0, playerNum - 1)
                        while (newPlayer === newPlayer2) {
                            newPlayer2 = getRandomIntInclusive(0, playerNum - 1)
                        }
                        setPlayerRandomNumber(newPlayer)
                        setPlayer2RandomNumber(newPlayer2)
                    }
                }
                else {
                    while (arr[newCard].checked == false) {
                        newCard = getRandomIntInclusive(0, arr.length - 1)
                    }

                }

            }

        }
    }

    const updateModal = () => {
        setModalIsVisible(!modalIsVisible)
    }

    const updateCheckbox = (index) => {

        arr[index].checked = !(arr[index].checked)
        forceUpdate()

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
        if (event.nativeEvent.oldState == State.ACTIVE) {
            const { translationY } = event.nativeEvent

            if (translationY <= -100) {

                Animated.timing(translateY, {
                    toValue: -900,
                    duration: 800,
                    useNativeDriver: true
                }).start();

                Animated.timing(translateY, {
                    toValue: 0,
                    useNativeDriver: true
                }).start(() => changeCard())

            }
            else {
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
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
                                    name='md-help'
                                    type='ionicon'
                                    color='#fff'
                                    size={60}
                                />
                            </View>
                            <View style={[{ height: '80%', justifyContent: 'center' }, cardText != '' ? { display: 'flex' } : { display: 'none' }]}>
                                <CardText style={{ fontSize: 25, color: 'white', marginBottom: 15 }}>{cardTitle}</CardText>
                                <CardText style={{ color: color[randomPlayer] }}>{player[randomPlayer]}</CardText>
                                <CardText >{cardText}</CardText>
                                <CardText style={{ color: color[randomPlayer2] }}>{player[randomPlayer2]}</CardText>
                                <CardText >{cardText2}</CardText>
                            </View>

                        </View>
                    </TouchableHighlight>
                    <Text style={{ color: '#ffffff', fontSize: 12, textAlignVertical: 'bottom', textAlign: 'center' }}>Clique ou deslize para Jogar</Text>
                </Card>
            </PanGestureHandler>

            <TouchableOpacity onPress={() => updateModal()} style={{ top: 70, height: 35, width: 100, backgroundColor: '#000' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>

                    <Text style={{ color: '#fff', textAlign: 'center', lineHeight: 35, marginRight: 15 }}>Cartas</Text>
                    <Icon
                        name='cards-outline'
                        type='material-community'
                        color='#fff'
                        size={20}
                    />

                </View>

            </TouchableOpacity>

            <Modal style={{ height: "85%", alignItems: "center" }} position={"bottom"}
                isOpen={modalIsVisible} onClosed={() => updateModal()} onBackdropPress={() => updateModal()}>
                <Text style={{ fontSize: 24, color: '#070', width: '100%', borderBottomWidth: 1, textAlign: 'center' }}>
                    Cartas Ativas
                </Text>

                <View style={{ width: '100%', height: '95%' }} onStartShouldSetResponder={() => true}>
                    <FlatList

                        data={arr}
                        renderItem={({ item, index }) => (

                            <CardInfo >
                                <CheckBox size={30} onPress={() => updateCheckbox(index)} checked={item.checked} checkedColor="#070" />
                                <View style={{ flexDirection: 'column', alignItems: 'center', minWidth: 200, maxWidth: 200 }}>
                                    <CardInfoTitle>
                                        {item.Title}
                                    </CardInfoTitle>
                                    <CardInfoText>
                                        Player 1 faz:{item.text}
                                    </CardInfoText>
                                    <CardInfoText>
                                        {item.text2 == "" ? "Player 2 faz:" + item.text2 : null}
                                    </CardInfoText>
                                </View>
                                <CardInfoText>
                                    {item.playerNumber}
                                </CardInfoText>

                            </CardInfo>

                        )
                        }
                    />
                </View>

            </Modal>

        </Wrapper >
    );

}



