import React from 'react';
import { Text, StyleSheet, View, Image} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

//import {PlayerList} from '../pages/Play'

import styles from '../styles/pagesStyles';


//"https://www.freepik.com/free-photos-vectors/menu" Menu vector created by vectorpocket - www.freepik.com
//Lembrar de atribuir



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

export default function Game({ navigation }) {
    return (

        <View style={[gameStyles.container, styles.container]} contentContainerStyle={styles.contentContainer}>

            <RectButton style={gameStyles.card}>

                <Text style={gameStyles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget magna diam. Proin efficitur eros nibh, eget porta lacus egestas ut. Nunc vel mauris quis nisi interdum feugiat. Vestibulum aliquet neque at sem pellentesque venenatis. Phasellus aliquet dolor eu iaculis euismod. Integer ligula dolor, dignissim id ligula et, mollis tempor est.</Text>

            </RectButton>

            <View style={gameStyles.card2} />
            <View style={gameStyles.card3} />
            <View style={gameStyles.card4} />

        </View>


    );

}


const gameStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'black',
        height: 400,
        width: 320,
        justifyContent: 'center',
        zIndex: 1,
        borderBottomWidth:1,
        borderColor:'white',
    },
    card2: {
        backgroundColor: 'gray',
        height: 10,
        width: 320,
        zIndex: 0,
        top: -2,
        borderBottomWidth:2,
        borderColor:'white',
    },
    card3: {
        backgroundColor: 'blue',
        height: 10,
        width: 320,
        zIndex: -1,
        top: -4,
        borderBottomWidth:2,
        borderColor:'white',
    },
    card4: {
        backgroundColor: 'red',
        height: 10,
        width: 320,
        zIndex: -2,
        top: -6,
        borderBottomWidth:2,
        borderColor:'white',
    },
    cardText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },

});



