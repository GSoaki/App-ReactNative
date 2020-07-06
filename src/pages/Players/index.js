import React, { useState, createRef, useEffect } from 'react'
import { TouchableOpacity, View, TextInput, Text, StyleSheet, AsyncStorage } from 'react-native'
import { Icon } from 'react-native-elements'

import color from '../../game/color'

import {usePlayer} from './../../context/playerContext'

const MAX_PLAYER_NUMBER = 9

export default function Player() {

  const { setPlayer } = usePlayer();

  const [playerArray, setPlayerArray] = useState([]);
  const [playerRefArray, setPlayerRefArray] = useState([])
  const [defaultInputText, setDefaultInputText] = useState('');

  useEffect(() => {
    async function setP() {
      await asyncStore()
    }

    if (playerArray.length > 0) {
      setP()
    }

    for (let step = playerRefArray.length; step < playerArray.length; step++) {
      playerRefArray[step] = createRef()
    }

    setPlayer(playerArray)

  }, [playerArray.length])


  useEffect(() => {

    getAsyncStore()


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

    }

  }

  const changePlayer = (index, value) => {

    if (playerArray.length > 0) {

      const newArray = [...playerArray]

      newArray[index] = value

      setPlayerArray(newArray)

    }

  }

  const asyncStore = async () => {
    setPlayer(playerArray)

    await AsyncStorage.setItem('playerArray', JSON.stringify(playerArray))
      .then(json => console.log('success!'))
      .catch(error => console.log('error!'))
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

      updateArray(defaultPlayer)

    }
    else {
      Alert.alert("Alerta", "Numero Maximo de Jogadores")
    }

  }
  return (
   
      <View style={playStyles.inputView}>

        <Text style={{ fontSize: 20 }}>
          Novo Jogador
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <View>

            <TextInput style={[playStyles.playerInput, playStyles.buttonText]} onChangeText={text => setDefaultInputText(text)} value={defaultInputText} />
          </View>
          <TouchableOpacity style={[playStyles.saveInputButton, playStyles.buttonText]} onPress={() => saveInput(defaultInputText)}>
            <Text style={{ color: 'white' }}>Add +</Text>
          </TouchableOpacity>

        </View>

        <Text style={[playStyles.text, { fontSize: 20 }]}>Jogadores:</Text>

        <View>
          {playerArray.map((currElement, index) => (
            <View key={index} style={{
              flexDirection: 'row', marginTop: 5,
              height: 50, backgroundColor: '#000', paddingLeft: 10, paddingRight: 10, borderColor: '#fff', borderWidth: 1
            }}>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View style={{ backgroundColor: color[index], width: 15, height: 15, marginRight: 20 }} />

                <TextInput onSubmitEditing={() => asyncStore()} onBlur={() => asyncStore()}
                  ref={playerRefArray[index]} onChangeText={text => changePlayer(index, text)} maxLength={15}
                  style={{ color: '#fff', fontSize: 16, maxWidth: 110, minWidth: 110 }}>{playerArray[index]}</TextInput>

                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                  <TouchableOpacity><Icon
                    name='md-create'
                    type='ionicon'
                    color='#fff'
                    size={35}
                    onPress={() => playerClick(index)}

                  /></TouchableOpacity>

                  <TouchableOpacity style={{ marginLeft: 5 }}><Icon

                    name='md-remove-circle'
                    type='ionicon'
                    color='#fff'
                    size={35}
                    onPress={() => removePlayer(index)}
                  /></TouchableOpacity>
                </View>
              </View>

            </View>
          ))}
        </View>

      </View>
  


  )
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
    borderColor: '#fff',
    borderWidth: 0.5
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
    color: 'black',
    fontSize: 19,
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontSize: 18,
  }

});


