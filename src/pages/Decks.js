import React from 'react';
import { Text, StyleSheet, View, Image, TouchableHighlight, ScrollView } from 'react-native';

import styles from '../styles/pagesStyles';

Shot = () => {
    const shotStyle = {
        width: 30,
        height: 30,
    };
    return <Image
        style={shotStyle}
        source={{
            uri: '../../assets/images/Shot.jpg',
        }}
    />;
};

export default function Decks({ navigation }) {
    return (

        <ScrollView style={ styles.container} contentContainerStyle={styles.contentContainer}>

            <TouchableHighlight style={gameStyles.card}>

                <Text style={gameStyles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

            </TouchableHighlight>

            <TouchableHighlight style={gameStyles.card}>

                <Text style={gameStyles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

            </TouchableHighlight>

            <TouchableHighlight style={gameStyles.card}>

                <Text style={gameStyles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

            </TouchableHighlight>

            <TouchableHighlight style={gameStyles.card}>

                <Text style={gameStyles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

            </TouchableHighlight>


        </ScrollView>


    );

}


const gameStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'black',
        height: 150,
        width: 320,
        justifyContent: 'center',
        zIndex: 1,
        borderBottomWidth: 1,
        borderColor: 'white',
        marginTop:20,
    },
    cardText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },

});



