import styled from 'styled-components/native';
import { Animated } from 'react-native';

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

export const CardInfo = styled.View`
    flex-direction: row;
    border-width:1px;
    border-color:#000;
    background-color:#fff;
    min-height: 100px;
    width:90%;
    margin:20px;
    margin-top:10px;
`;

export const CardInfoTitle = styled.Text`
    color:#000;
    font-size:20px;
    text-align:center;
    justify-content:center;
    margin:5px;
`;

export const CardInfoText = styled.Text`
    color:#000;
    font-size:14px;
    text-align:center;
    max-width:80%;
`;




