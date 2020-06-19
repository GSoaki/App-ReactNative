import React,{ useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput} from 'react-native';

import styles from '../../styles/styles';

const Cards = (props) => {
    const cardArray = []
    
    useEffect(()=>{
        cardArray.push(...props.items)
    },[])

    return(
        <ScrollView>
            {cardArray.map(index=>(
                <TextInput>cardArray[index]</TextInput>
            ))}
        </ScrollView>
    )
}


export default Cards;