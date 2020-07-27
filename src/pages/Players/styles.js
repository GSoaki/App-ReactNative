import React from 'react'
import styled from 'styled-components/native';

export const Container = styled.View`
    align-items: center;
    flex:1;
    background-color: ${props => props.theme.theme.background};
`;

export const Title = styled.Text`
    font-size: 20px;
    color:${props => props.theme.theme.color};
    margin-top: 15px;
    margin-bottom: 15px;
`;

export const InputContainer = styled.View`
    flex-direction: row; 
    align-items: center; 
`;

export const PlayerInput = styled.TextInput`
    background-color: ${props => props.theme.theme.light};
    margin-left: 30px;
    height: 30px;
    width: 240px;
    padding:5px;
    font-size:18px;
    border-width:1px;
    border-color:${props => props.theme.theme.dark};
`;

export const PlayerContainer = styled.View`
    border-width: 0.5px; 
    border-color: #f5f5f5;
    flex-direction: row; 
    margin-top: 10px;
    height: 40px;
    background-color: ${props => props.theme.theme.dark};
    padding-left: 10px; 
    padding-right: 10px;
`;

export const PlayerName = styled.TextInput`
    color:${props => props.theme.theme.light};
    font-size: 16px; 
    max-width: 110px; 
    min-width: 110px;
`;

export const IconContainer = styled.View`
    flex-direction: row; 
    margin-left: 20px; 
`;