import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, AsyncStorage, TextInput, Alert } from 'react-native';
import { Icon, Overlay } from 'react-native-elements'

import Cards from './cards'

import styles from '../../styles/styles';

const defaultDeck = "baralho básico"

export default function Decks({ navigation }) {

    const [deckNameArray, setDeckNameArray] = useState([]);
    const [deckCardArray, setDeckCardArray] = useState([[]]);
    const [overlay, setOverlay] = useState(false)
    const [overlayIndex, setOverlayIndex] = useState(0)
    const [playDeck, setPlayDeck] = useState('')

    const getPlayDeck = async () => {

        const play = getAsyncStore('playDeck')
        setPlayDeck(play)
      

        if(playDeck == ''){
            setPlayDeck(defaultDeck)
        }

    }


    const removeDeck = async (index) => {

        if (deckNameArray.length > 0) {

            const newArray = deckNameArray
            newArray.splice(index, 1)

            console.log(newArray)

            setDeckNameArray(newArray)

            removeDeckCard(index)

            await removeStoredDeck()
        }

    }

    const asyncStore = async (name,value) => {
        return (
          await AsyncStorage.setItem(name, JSON.stringify(value))
            .then(json => console.log('success!'))
            .catch(error => console.log('error!')))
    }
    
    const getAsyncStore = async (name) => {
    
        const item = null
    
        await AsyncStorage.getItem(name)
        .then(req => JSON.parse(req))
        .then(json => (item = json))
        .catch(error => console.log('error!'))
    
        return (item)
    }

    const addCard = (index) => {

        let newDeckCardArray = deckCardArray
        newDeckCardArray[index].push("carta" + (deckCardArray[index].length + 1))

        setDeckCardArray(newDeckCardArray)
    }

    const removeDeckCard = (index) => {

        if (deckCardArray.length > 0) {

            const newArray = deckCardArray
            newArray.splice(index, 1)

            console.log(newArray)

            setDeckCardArray(newArray)
            removeStoredDeck()
        }

    }

    const updateDecks = (name) => {

        let newDeckNameArray = deckNameArray
        newDeckNameArray = [...deckNameArray, name]
        setDeckNameArray(newDeckNameArray)

    }

    const updatePlayDeck = (name) => {

        setPlayDeck(name)
        
        changePlayDeck()

    }

    const addDeck = () => {

        const defaultName = 'Deck' + (deckNameArray.length + 1)

        updateDecks(defaultName)

    }

    const deleteDeck = (index) => {
        Alert.alert(
            'Deletar baralho',
            'Deseja mesmo deletar seu baralho?',
            [
                { text: 'Não', onPress: () => console.log('NO Pressed') },
                { text: 'Sim', onPress: () => (removeDeck(index), setOverlay(!overlay)) },
            ]
        );
    }

    const updateOverlay = (index) => {
        setOverlay(!overlay)
        setOverlayIndex(index)
    }

    useEffect(() => {

        getPlayDeck()
        const deck = getAsyncStore('deck')

        setDeckNameArray(deck)

        if (deckNameArray.indexOf(playDeck) == -1) {
            updatePlayDeck(defaultDeck)
        }


    }, []);

    useEffect(() => {

        asyncStore('deck',deckNameArray)

        if (deckNameArray.indexOf(playDeck) == -1) {
            updatePlayDeck(defaultDeck)
        }

    }, [deckNameArray.length])

    return (

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={{ backgroundColor: '#000', color: '#fff', padding: 5, margin: 5 }}>Baralho ativo: {playDeck}</Text>


          
            <Overlay onBackdropPress={() => updateOverlay()} isVisible={overlay} overlayStyle={{ height: 450, width: 275, backgroundColor: '#000000', borderColor: '#ffffff', borderWidth: 1 }}>

                <TextInput style={[{ fontSize: 22, marginTop: 20, color: '#ffffff', textAlign: 'center' }]}>{deckNameArray[overlayIndex]}</TextInput>
                <Text style={[{ fontSize: 22, marginTop: 20, color: '#ffffff' }]}>Cartas:</Text>

                <Cards items={deckCardArray} />

                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => addCard(overlayIndex)} style={{ marginTop: -15 }}><Icon
                        reverse
                        name='md-create'
                        type='ionicon'
                        color='#000000'
                        size={21}
                    /></TouchableOpacity>

                    <TouchableOpacity onPress={() => removeDeckCard()} style={{ marginLeft: -15, marginTop: -15 }}>
                        <Icon
                            reverse
                            name='md-remove-circle'
                            type='ionicon'
                            color='#000000'
                            size={21}
                        />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={() => updatePlayDeck(deckNameArray[overlayIndex])} style={{ marginLeft: -15 }}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Selecionar este Deck</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteDeck(overlayIndex)} style={{ marginLeft: -15 }}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Remove Deck</Text>
                </TouchableOpacity>

            </Overlay>

            <TouchableOpacity onPress={() => addDeck()} style={{ backgroundColor: 'black', width: 150, height: 30, marginTop: 20 }}>
                <Text style={{ color: 'white', textAlign: 'center', lineHeight: 30 }}>Novo Baralho +</Text>
            </TouchableOpacity>

            {deckNameArray.map((currElement, index) => (

                <TouchableOpacity onPress={() => updateOverlay(index)} key={index} style={gameStyles.card}>

                    <TextInput editable={true} style={gameStyles.cardText}>{deckNameArray[index]}</TextInput>

                </TouchableOpacity>
            ))}

        </ScrollView>

    );

}

const gameStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#000000',
        height: 150,
        width: 320,
        justifyContent: 'center',
        zIndex: 1,
        marginTop: 20,
        elevation: 20,
        elevation: 20,
        alignItems: 'center'
    },
    cardText: {
        color: 'white',
        fontSize: 20,
    },

});



