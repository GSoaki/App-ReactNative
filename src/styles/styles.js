import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020c1c',
    },
    option: {
        backgroundColor:'#111b2c',
        padding:20,
        paddingHorizontal:60,
        margin: 30,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 10,
        elevation: 20,
    },
    alignContainer:{
        alignContent:'center'
    },
    optionText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight:'bold',
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