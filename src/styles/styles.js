import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    option: {
        flexDirection:'row',
        backgroundColor:'#000000',
        padding:15,
        paddingHorizontal:60,
        margin: 25,
        marginBottom:20,
        alignItems: 'center',
        justifyContent:'center',
        elevation: 20,
    },
    alignContainer:{
        alignContent:'center'
    },
    optionText: {
        fontSize: 20,
        textAlign:'left',
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