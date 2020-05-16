import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c5787',
    },
    option: {
        backgroundColor: '#4682b4',
        height: 80,
        width: 300,
        margin: 30,
        borderWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 30,
    },
    optionText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    MainText: {
        marginTop:10,
        color: 'rgba(256,256,256,1)',
        alignItems: 'center',
        fontSize: 25,
    },
    contentContainer:{
        alignItems:'center'
    },

});

export default styles;