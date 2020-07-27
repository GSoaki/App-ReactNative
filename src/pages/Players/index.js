import React, { useState, createRef, useEffect } from 'react'

import { TouchableOpacity, View, TextInput, Text, AsyncStorage, Alert, ScrollView } from 'react-native'

import { Icon } from 'react-native-elements'

import color from '../../game/color'

import { usePlayer } from './../../context/playerContext'

import {
  Container,
  Title,
  InputContainer,
  PlayerInput,
  PlayerContainer,
  PlayerName,
  IconContainer
} from './styles'

const MAX_PLAYER_NUMBER = 9

export default function Player() {

  const { player, setPlayer } = usePlayer();

  const [playerArray, setPlayerArray] = useState([]);
  const [playerRefArray, setPlayerRefArray] = useState([])
  const [defaultInputText, setDefaultInputText] = useState('');

  useEffect(() => {
    async function setP() {
      await asyncStore()
    }

    setP()

    for (let step = playerRefArray.length; step < playerArray.length; step++) {
      playerRefArray[step] = createRef()
    }

    setPlayer(playerArray)

  }, [playerArray.length])


  useEffect(() => {

    setPlayerArray(player)

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
      .catch(error => console.log('error2!'))
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

    <Container>

      <Title>
        Novo Jogador
      </Title>

      <InputContainer>
        <PlayerInput onChangeText={text => setDefaultInputText(text)} value={defaultInputText} />

        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => saveInput(defaultInputText)}>
          <Icon
            name='md-add-circle'
            type='ionicon'
            color='#070'
            size={30}
          />
        </TouchableOpacity>
      </InputContainer>

      <Title>Jogadores:</Title>

      <ScrollView>
        {playerArray.map((currElement, index) => (
          <PlayerContainer key={index}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <View style={{ backgroundColor: color[index], width: 15, height: 15, marginRight: 20 }} />

              <PlayerName onSubmitEditing={() => asyncStore()} onBlur={() => asyncStore()}
                ref={playerRefArray[index]} onChangeText={text => changePlayer(index, text)} maxLength={15}
              >{playerArray[index]}</PlayerName>

              <IconContainer>
                <TouchableOpacity>
                  <Icon
                    name='md-create'
                    type='ionicon'
                    color='#fff'
                    size={30}
                    onPress={() => playerClick(index)}
                  />

                </TouchableOpacity>

                <TouchableOpacity style={{ marginLeft: 15 }}>
                  <Icon
                    name='md-remove-circle'
                    type='ionicon'
                    color='#fff'
                    size={30}
                    nPress={() => removePlayer(index)}
                  />

                </TouchableOpacity>
              </IconContainer>
            </View>

          </PlayerContainer>
        ))}
      </ScrollView>



    </Container >



  )
}





