import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';

import styles from '../styles/pagesStyles';
import { OptionButton } from '../OptionButton';

const MAX_PLAYER_NUMBER = 4

export default function Play({ navigation }) {
  var map = new Map();
  const [playerNumber, setPlayerNumber] = useState(0);
  const [otherPlayer, setPlayer] = useState('');
  const [inputTextON, setInputON] = useState(false);
  const [backMenuOp, setMenuOp] = useState(false);
  const [defaultInputText, setDefaultInputText] = useState('');



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

  saveInput = (newPlayer) => {
    setDefaultInputText('')
    if (playerNumber < MAX_PLAYER_NUMBER) {
      setPlayerNumber(playerNumber + 1)
      player = 'player' + (playerNumber + 1)

      if (newPlayer == '' || newPlayer == undefined) {
        //setPlayer(otherPlayer + {player: player})
        map.set(player, player)
        setPlayer(otherPlayer + map.get('player' + (playerNumber + 1)))
      }
      else {
        //setPlayer(otherPlayer + { player: newPlayer })
        map.set(player, newPlayer)
        setPlayer(otherPlayer + map.get('player' + (playerNumber + 1)) + ',')
      }
    }
    else {
      alert("Numero Maximo de Jogadores")
    }

  }

  return (

    < View style={styles.container} contentContainerStyle={styles.contentContainer} >

      <TouchableOpacity style={[playStyles.addInputButton, playStyles.text]} onPress={() => playerMenu()}>
        <Text>{PlayerNumber}</Text>
      </TouchableOpacity>

      <View style={[playStyles.playerMenu, !inputTextON && { display: 'none' }]}>
        <View style={playStyles.inputView}>

          <TextInput style={[playStyles.playerInput, playStyles.text]} onChangeText={text => setDefaultInputText(text)} value={defaultInputText} />

          <TouchableOpacity style={[playStyles.saveInputButton, playStyles.text]} onPress={() => saveInput(defaultInputText)}>
            <Text>Save</Text>
          </TouchableOpacity>
          <Text style={styles.MainText}>Jogadores:{'\n'} {otherPlayer}</Text>
        </View>
      </View>

      <View style={[{ position: 'absolute' }, backMenuOp && { opacity: 0.2 }, { marginTop: 50 }]}>

        <OptionButton
          label="Crie seu Baralho"
        //onPress={() => navigation.navigate('Create')}
        />

        <OptionButton
          label="Seus Baralhos"
          onPress={() => navigation.navigate('Decks')}
        />

        <OptionButton
          label="Baralho Classico"
          onPress={() => navigation.navigate('Game')}
        />
      </View>

    </View >
  );

}

const playStyles = StyleSheet.create({
  addInputButton: {
    height: 35,
    width: 50,
    backgroundColor: '#4682b4',
    left: 300,
    top: 10,
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
    width: 50,
    backgroundColor: '#1c5787',
    marginTop: 10,
  },
  text: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  playerMenu: {
    zIndex: 1,
    backgroundColor: '#4682b4',
    height: 400,
    width: 250,
    top: 55,
    left: 55,
  },

});







