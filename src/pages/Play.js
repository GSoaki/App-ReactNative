import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements'


import styles from '../styles/styles';


const MAX_PLAYER_NUMBER = 8
var thereArePlayers = false

export default function Play({ navigation, route }) {
  const [playerNumber, setPlayerNumber] = useState(0);
  const [playerArray, setPlayerArray] = useState([]);
  const [player, setPlayer] = useState('')
  const [inputTextON, setInputON] = useState(false);
  const [backMenuOp, setMenuOp] = useState(false);
  const [defaultInputText, setDefaultInputText] = useState('');

  var PlayerString = ''

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
    return (await AsyncStorage.setItem('playerNumber', JSON.stringify(playerNumber + 1))
      .then(json => console.log('success!'))
      .catch(error => console.log('error!')),
      await AsyncStorage.setItem('playerStorage', JSON.stringify(playerArray))
        .then(json => console.log('success!'))
        .catch(error => console.log('error!')))
  }

  removeStoredPlayer = async () => {
    setPlayerNumber(0)
    setPlayer('')
    setPlayerArray([])
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
        .then(json => setPlayerArray(json))
        .then(teste => showPlayer())
        .catch(error => console.log('error!')))
  }

  showPlayer = () => {

    PlayerString = playerArray.join('\n\n')

    setPlayer(PlayerString)

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

      let defaultPlayer = ''

      if (newPlayer == '' || newPlayer == undefined) {

        defaultPlayer = 'player' + (playerNumber + 1)

      }
      else {

        defaultPlayer = newPlayer

      }

      playerArray[playerNumber] = defaultPlayer

      showPlayer()
      storePlayer()
    }
    else {
      alert("Numero Maximo de Jogadores")
    }

  }

  return (

    <View style={styles.container} contentContainerStyle={styles.contentContainer} >

      <TouchableOpacity style={[playStyles.addInputButton, playStyles.buttonText, { flexDirection: 'row' }]} onPress={() => playerMenu()}>
        <Text style={{ color: 'white', marginRight: -5, marginLeft: 15 }}>{playerNumber}</Text>
        <Icon
          reverse
          name='md-person-add'
          type='ionicon'
          color='#111b2c'
          size={17}
        />
      </TouchableOpacity>

      <View style={[playStyles.playerMenuStyle, !inputTextON && { display: 'none' }]}>
        <View style={playStyles.inputView}>

          <TextInput style={[playStyles.playerInput, playStyles.buttonText]} onChangeText={text => setDefaultInputText(text)} value={defaultInputText} />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[playStyles.saveInputButton, playStyles.buttonText, { marginRight: 20 }]} onPress={() => saveInput(defaultInputText)}>
              <Text style={{ color: 'white' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[playStyles.saveInputButton, playStyles.buttonText]} onPress={() => removeStoredPlayer()}>
              <Text style={{ color: 'white' }}>Remove</Text>
            </TouchableOpacity>
          </View>

          <View style={[playStyles.playerColor,{backgroundColor :'blue'}]}/>
          <View style={[playStyles.playerColor,{backgroundColor :'white'}]}/>
          <View style={[playStyles.playerColor,{backgroundColor :'pink'}]}/>
          <View style={[playStyles.playerColor,{backgroundColor :'orange'}]}/>
          <View style={[playStyles.playerColor,{backgroundColor :'grey'}]}/>
          <View style={[playStyles.playerColor,{backgroundColor :'red'}]}/>
          <View style={[playStyles.playerColor,{backgroundColor :'purple'}]}/>
          <View style={[playStyles.playerColor,{backgroundColor :'green'}]}/>
          <Text style={[playStyles.text,{fontSize:25,marginTop:10}]}>Jogadores:</Text>
          <Text style={[playStyles.text,{marginTop:35}]}>{"\n"}{player}</Text>

        </View>
      </View>

      <View>
        <View style={[backMenuOp && { opacity: 0.2 }, { marginTop: 50 }]}>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Game',{players:playerArray,playerNumber:playerNumber})}
          ><Text style={styles.optionText}>Baralho basico</Text></TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Decks')}
          ><Text style={styles.optionText}>Seus baralhos</Text></TouchableOpacity> 

          <TouchableOpacity
            style={styles.option}
          //onPress={() => navigation.navigate('Create')}
          ><Text style={styles.optionText}>Crie seu baralho</Text></TouchableOpacity>

        </View>
      </View>


    </View>
  );

}

const playStyles = StyleSheet.create({
  addInputButton: {
    height: 50,
    width: 60,
    backgroundColor: '#111b2c',
    left: 290,
    top: 8,
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
    justifyContent: 'center',
    color: 'white',
    fontSize:19,
    position:'absolute',
    top:80,
  },
  buttonText:{
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize:18,
  },
  playerMenuStyle: {
    zIndex: 1,
    backgroundColor: '#111b2c',
    height: 500,
    width: 250,
    top: 65,
    left: 55,
  },
  playerColor:{
      height:10,
      width:10,
      margin:35,
      position:'relative',
      left:-60,
      top:5,
  },

});







