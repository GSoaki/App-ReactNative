import styled from 'styled-components/native';

export const Container = styled.View`  
    flex: 1;
    background-color: ${props => props.theme.secondary};`;

export const Option = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${props => props.theme.primary};
    padding: 15px;
    margin: 25px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
    border-color:#fff;
    border-width:0.5px;
`;

export const OptionText = styled.Text`
    font-size: 20px;
    text-align: left;
    color: ${props => props.theme.text};
    font-weight: bold;
`;




