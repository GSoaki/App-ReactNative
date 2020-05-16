import React from 'react';
import { Text, View } from 'react-native';

import styles from '../styles/pagesStyles';
import { OptionButton } from '../OptionButton';


export default function Home({ navigation }) {
    return (

        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.MainText}>

                <Text style={styles.MainText}>Jogar</Text>

            </View>

            <OptionButton
                label="Novo Jogo"

                onPress={() => navigation.navigate('Play')}

            />

            <OptionButton
                label="Continue"

                isLastOption
            />

            <OptionButton
                label="Configurações"

                isLastOption
            />
        </View>


    );

}




