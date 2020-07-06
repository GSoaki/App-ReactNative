import React from 'react'
import styled from 'styled-components/native';

export const Container = styled.View`  
    flex: 1;
    background-color: ${props => props.theme.theme.background};
`;

export const Option = styled.TouchableOpacity`
    flex-direction: row;
    background-color:  ${props => props.theme.theme.primary};
    padding: 15px;
    margin: 25px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
`;

export const OptionText = styled.Text`
    font-size: 40px;
    text-align: left;
    color: ${props => props.theme.theme.color};
    font-weight: bold;
`;





