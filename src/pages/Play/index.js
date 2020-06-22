import React, { useState, useEffect, useRef, createRef } from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, AsyncStorage, Alert, ImagePropTypes } from 'react-native';
import { Icon, Overlay } from 'react-native-elements'

import { OptionText, Option, Container } from './styles'

import color from '../../game/color'

const MAX_PLAYER_NUMBER = 10
const defaultDeck = "baralho básico"

export default function Play({ navigation, route }) {

  const [playerArray, setPlayerArray] = useState([]);
  const [playerRefArray, setPlayerRefArray] = useState([])
  const [overlay, setOverlay] = useState(false);
  const [defaultInputText, setDefaultInputText] = useState('');
  const [playDeck, setPlayDeck] = useState('')

  useEffect(() => {

    for (let step = playerRefArray.length; step < playerArray.length; step++) {
      playerRefArray[step] = createRef()
    }

  }, [playerArray.length])


  useEffect(() => {

    getAsyncStore()

    getPlayDeck()

  }, []);


  const playerClick = (index) => {
    playerRefArray[index].current.focus()
  }

  const updateArray = (value) => {

    let newPlayerArray = [...playerArray, value]
    setPlayerArray(newPlayerArray)

  }

  const removePlayer = (index) => {

    if (playerArray.length > 0) {

      const newArray = [...playerArray]
      newArray.splice(index, 1)

      setPlayerArray(newArray)
      asyncStore()

    }

  }

  const changePlayer = (index, value) => {
    if (playerArray.length > 0) {

      const newArray = [...playerArray]

      newArray[index] = value

      setPlayerArray(newArray)

    }

    asyncStore()

  }


  const getPlayDeck = async () => {

    if (playDeck == "") {
      setPlayDeck(defaultDeck)
    }
    else {
      await AsyncStorage.getItem('playDeck')
        .then(req => JSON.parse(req))
        .then(json => setPlayDeck(json))
        .catch(error => console.log('error!'))
    }

  }

  const playerMenu = () => {

    setOverlay(!overlay)

  }

  const startGame = () => {
    if (playerArray.length > 1) {
      navigation.navigate('Game', { players: playerArray })
    }
    else {
      Alert.alert("Aviso", "Adicione jogadores para iniciar o jogo!")
    }

  }

  const asyncStore = async () => {

    return (
      await AsyncStorage.setItem('playerArray', JSON.stringify(playerArray))
        .then(json => console.log('success!'))
        .catch(error => console.log('error!')))
  }

  const getAsyncStore = async () => {

    await AsyncStorage.getItem('playerArray')
      .then(req => JSON.parse(req))
      .then(json => setPlayerArray(json))
      .catch(error => console.log('error!'))
  }

  const saveInput = (newPlayer) => {

    setDefaultInputText('')
    if (playerArray.length < MAX_PLAYER_NUMBER) {

      let defaultPlayer = ''

      if (newPlayer == '' || newPlayer == undefined) {
        defaultPlayer = 'player' + (playerArray.length + 1)
      }
      else {
        defaultPlayer = newPlayer
      }

      updateArray([defaultPlayer])

      asyncStore()

    }
    else {
      Alert.alert("Alerta", "Numero Maximo de Jogadores")
    }

  }

  return (

    <Container contentContainerStyle={{ alignText: 'center' }} >

      <TouchableOpacity style={[playStyles.addInputButton, playStyles.buttonText, { flexDirection: 'row' }]} onPress={() => playerMenu()}>
        <Text style={{ color: 'white', marginRight: -5, marginLeft: 15 }}>{playerArray.length}</Text>
        <Icon
          reverse
          name='md-person-add'
          type='ionicon'
          color='#000000'
          size={17}
        />
      </TouchableOpacity>

      <Overlay onBackdropPress={() => playerMenu()} isVisible={overlay} overlayStyle={{ backgroundColor: '#000000', minHeight: 350, borderColor: '#fff', borderWidth: 0.5}}>
        <View style={playStyles.inputView}>

          <TextInput style={[playStyles.playerInput, playStyles.buttonText]} onChangeText={text => setDefaultInputText(text)} value={defaultInputText} />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[playStyles.saveInputButton, playStyles.buttonText]} onPress={() => saveInput(defaultInputText)}>
              <Text style={{ color: 'white' }}>Add +</Text>
            </TouchableOpacity>
          </View>

          <Text style={[playStyles.text, { fontSize: 22, marginTop: 20 }]}>Jogadores:</Text>

          <View style={{ marginTop: 50 }}>
            {playerArray.map((currElement, index) => (
              <View key={index} style={{ flexDirection: 'row', marginTop: -20 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ backgroundColor: color[index], width: 10, height: 10, marginRight: 20 }} /><TextInput
                    ref={playerRefArray[index]} onChangeText={text => changePlayer(index, text)} maxLength={15}
                    style={{ color: '#ffffff', fontSize: 16 }}>{playerArray[index]}</TextInput>
                </View>

                <TouchableOpacity ><Icon
                  reverse
                  name='md-create'
                  type='ionicon'
                  color='#000000'
                  size={21}
                  onPress={() => playerClick(index)}

                /></TouchableOpacity>

                <TouchableOpacity style={{ marginLeft: -15 }}><Icon
                  reverse
                  name='md-remove-circle'
                  type='ionicon'
                  color='#000000'
                  size={21}
                  onPress={() => removePlayer(index)}
                /></TouchableOpacity>
              </View>
            ))}
          </View>

        </View>
      </Overlay>

      <View>
        <View>

          <Option
            onPress={() => startGame()}
          >

            <View>
              <OptionText >Jogue</OptionText>
              <OptionText style={{ fontSize: 15 }}>Com {playDeck}</OptionText>
            </View>

            <Icon
              style={{marginLeft:20}}
              reverse
              name='md-play'
              type='ionicon'
              color='#000000'
              size={30}
            />
          </Option>

          <Option
            onPress={() => navigation.navigate('Decks')}
          >
            <OptionText>Seus baralhos</OptionText>
            <Icon
              style={{marginLeft:20}}
              reverse
              name='md-archive'
              type='ionicon'
              color='#000000'
              size={30}
            />
          </Option>



        </View>
      </View>


    </Container>
  );

}


const playStyles = StyleSheet.create({
  addInputButton: {
    height: 50,
    width: 60,
    backgroundColor: '#000000',
    left: 290,
    top: 8,
    zIndex: 1,
    position: 'relative',
    borderColor:'#fff',
    borderWidth:0.5
  },
  inputView: {
    alignItems: 'center',
  },
  playerInput: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    height: 35,
    width: 200,
  },
  saveInputButton: {
    height: 35,
    width: 55,
    backgroundColor: '#000000',
    marginTop: 10,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 19,
    position: 'absolute',
    top: 80,
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: 18,
  }


});






