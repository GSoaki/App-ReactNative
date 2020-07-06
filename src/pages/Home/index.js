import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, AsyncStorage, Alert, Image } from 'react-native';

import { Icon } from 'react-native-elements'
import { Switch } from 'react-native-switch';

import { usePlayer } from './../../context/playerContext'

import logoW from './../../../assets/images/iconWhite.png'
import logoB from './../../../assets/images/icon.png'

import { Container, Option, OptionText} from './styles'

import ThemeContext from './../../styles/themes/context'


const defaultDeck = "baralho básico"

export default function Home({navigation}) {

  const { player } = usePlayer();
  const theme = useContext(ThemeContext)
  const [playDeck, setPlayDeck] = useState('');
  const [themeValue, setThemeValue] = useState(false);

  useEffect(() => {
    
    getPlayDeck()

  }, []);

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

  const startGame = () => {
    if (player.length > 1) {
      navigation.navigate('Game')
    }
    else {
      Alert.alert("Aviso", "Adicione jogadores para iniciar o jogo!")
    }

  }

  const themeSwitch = () =>{
    setThemeValue(!themeValue)
    theme.toggle()
  }


  return (

    <Container contentContainerStyle={{ alignText: 'center' }} >
      <View style={{ margin: 20, position: 'absolute' }}>
        <Switch
          value={themeValue}
          switchWidthMultiplier={2.5}
          backgroundActive={'gray'}
          onValueChange={() => (themeSwitch())}
          renderActiveText={false}
          renderInActiveText={false}
          changeValueImmediately={true}
          renderInsideCircle={() =>
            <View  style={{ backgroundColor: themeValue == true ? '#fff' : '#000', borderRadius: 20}}>
              <Image source={themeValue == true ? logoB : logoW} style={{ width: 50, height: 50 }} />
            </View >
          }
        />
      </View>

      <TouchableOpacity style={[playStyles.addInputButton, playStyles.buttonText, { flexDirection: 'row' }]} onPress={()=>navigation.navigate('Players')}>
        <Text style={{ color: 'white', marginRight: 5}}>{player.length}</Text>
        <Icon
          name='md-person-add'
          type='ionicon'
          color='#fff'
          size={20}
          
        />
      </TouchableOpacity>

      <View style={{marginTop:160}}>
        
          <Option onPress={() => startGame()}>

            <View>
              <OptionText >Jogue</OptionText>
              <OptionText style={{ fontSize: 15, color: '#777' }}>Com {playDeck}</OptionText>
            </View>

            <Icon
              style={{ marginLeft: 35 }}
              color='#070'
              name='md-play'
              type='ionicon'
              size={50}
            />
          </Option>

  
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
    borderColor: '#fff',
    borderWidth: 0.5
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




