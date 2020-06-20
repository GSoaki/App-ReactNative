import React,{ useEffect } from 'react'
import { ScrollView, TextInput} from 'react-native';


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