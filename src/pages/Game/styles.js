import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Wrapper = styled.View`
    flex: 1;
    background-color: #ffffff;
    color:#000000;
    align-items: center;
    justify-content: center;
`;

export const Card = styled(Animated.View)`
    background-color:#000000;
    height: 400px;
    width: 320px;
    justify-content: center;
    z-index: 1;
    padding:20px;
`;


export const CardText = styled.Text`
    font-size: 20px;
    text-align: center;
    color:#ffffff;
`;

  
      
 


