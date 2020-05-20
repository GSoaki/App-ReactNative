import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import styles from '../styles/styles';

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

            <TouchableOpacity style={gameStyles.card}>

                <Text style={gameStyles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

            </TouchableOpacity>

            <TouchableOpacity style={gameStyles.card}>

                <Text style={gameStyles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

            </TouchableOpacity>

            <TouchableOpacity style={gameStyles.card}>

                <Text style={gameStyles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

            </TouchableOpacity>

            <TouchableOpacity style={gameStyles.card}>

                <Text style={gameStyles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

            </TouchableOpacity>


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
        marginTop:20,
        elevation:20,
        elevation:20,
    },
    cardText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },

});



