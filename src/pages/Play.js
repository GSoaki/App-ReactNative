import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'

import { OptionButton } from '../OptionButton';
import styles from '../styles/pagesStyles';

const MAX_PLAYER_NUMBER = 4
var thereArePlayers = false

export default function Play({ navigation, route }) {
  const [playerNumber, setPlayerNumber] = useState(0);
  const [otherPlayer, setPlayer] = useState('');
  const [inputTextON, setInputON] = useState(false);
  const [backMenuOp, setMenuOp] = useState(false);
  const [defaultInputText, setDefaultInputText] = useState('');

  var players = {
    name: '',
    number: 0,
  }

  playerMenu = () => {
    if (!inputTextON) {
      setInputON(true)
      setMenuOp(true)
    }
    else {
      setInputON(false)
      setMenuOp(false)
    }

  }

  storePlayer = async () => {
    return (await AsyncStorage.setItem('playerNumber', JSON.stringify(playerNumber+1))
      .then(json => console.log('success!'))
      .catch(error => console.log('error!')),
      await AsyncStorage.setItem('playerStorage', JSON.stringify(otherPlayer))
        .then(json => console.log('success!'))
        .catch(error => console.log('error!')))
  }

  removeStoredPlayer = async () => {
    setPlayerNumber(0)
    setPlayer('')
    return (await AsyncStorage.setItem('playerNumber', JSON.stringify(0))
      .then(json => console.log('success!'))
      .catch(error => console.log('error!')),

      await AsyncStorage.setItem('playerStorage', JSON.stringify(''))
        .then(json => console.log('success!'))
        .catch(error => console.log('error!')))
  }

  getPlayerStored = async () => {
    return (
      await AsyncStorage.getItem('playerNumber')
        .then(req => JSON.parse(req))
        .then(json => setPlayerNumber(json))
        .catch(error => console.log('error!')),

      await AsyncStorage.getItem('playerStorage')
        .then(req => JSON.parse(req))
        .then(json => setPlayer(json))
        .catch(error => console.log('error!')))
  }

  if (thereArePlayers == false) {
    getPlayerStored()
    thereArePlayers = true
  }

  saveInput = (newPlayer) => {
    thereArePlayers = true
    setDefaultInputText('')
    if (playerNumber < MAX_PLAYER_NUMBER) {
      setPlayerNumber(playerNumber + 1)
      let player = 'player' + (playerNumber+1)

      
      if (newPlayer == '' || newPlayer == undefined) {
        players.name = player
        players.number = (playerNumber+1)
        setPlayer(otherPlayer + player)
    }
      else {
        players.name = newPlayer
        players.number = playerNumber+1
        setPlayer(otherPlayer + newPlayer)
      }
      storePlayer()
    }
    else {
      alert("Numero Maximo de Jogadores")
    }

  }

  return (

    <View style={styles.container} contentContainerStyle={styles.contentContainer} >

      <TouchableOpacity style={[playStyles.addInputButton, playStyles.text, { flexDirection: 'row' }]} onPress={() => playerMenu()}>
        <Text style={{ color: 'white', marginRight: -5, marginLeft: 15 }}>{playerNumber}</Text>
        <Icon
          reverse
          name='md-person-add'
          type='ionicon'
          color='#091324'
          size={17}
        />
      </TouchableOpacity>

      <View style={[playStyles.playerMenuStyle, !inputTextON && { display: 'none' }]}>
        <View style={playStyles.inputView}>

          <TextInput style={[playStyles.playerInput, playStyles.text]} onChangeText={text => setDefaultInputText(text)} value={defaultInputText} />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[playStyles.saveInputButton, playStyles.text, { marginRight: 20 }]} onPress={() => saveInput(defaultInputText)}>
              <Text style={{ color: 'white' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[playStyles.saveInputButton, playStyles.text]} onPress={() => removeStoredPlayer()}>
              <Text style={{ color: 'white' }}>Remove</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.MainText}>Jogadores:{"\n"} {otherPlayer}</Text>
        </View>
      </View>

      <View>
        <View style={[backMenuOp && { opacity: 0.2 }, { marginTop: 50 }]}>

          <OptionButton
            label="Baralho classico"
            onPress={() => navigation.navigate('Game')}
          />

          <OptionButton
            label="Seus baralhos"
            onPress={() => navigation.navigate('Decks')}
          />

          <OptionButton
            label="Crie seu baralho"
          //onPress={() => navigation.navigate('Create')}
          />

        </View>
      </View>


    </View>
  );

}

const playStyles = StyleSheet.create({
  addInputButton: {
    height: 50,
    width: 60,
    backgroundColor: '#091324',
    left: 290,
    top: 15,
    zIndex: 1,
    position: 'absolute',
  },
  inputView: {
    alignItems: 'center',
  },
  playerInput: {
    backgroundColor: 'white',
    marginTop: 10,
    height: 35,
    width: 200,
  },
  saveInputButton: {
    height: 35,
    width: 55,
    backgroundColor: '#0f2140',
    marginTop: 10,
  },
  text: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  playerMenuStyle: {
    zIndex: 1,
    backgroundColor: '#091324',
    height: 400,
    width: 250,
    top: 55,
    left: 55,
  },

});







