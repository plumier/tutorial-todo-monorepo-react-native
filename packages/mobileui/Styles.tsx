import { StyleSheet} from 'react-native';
export const styles =StyleSheet.create({
  //global style
    container: {
        flex: 1,
        backgroundColor: '#66bfff',
        alignItems: 'center',
        justifyContent: 'center',
        padding :20},
      h1:{
        fontWeight:'bold',
        fontSize:30,
        textAlign:'left',
        paddingLeft:-10},
      //used in home screen
      homeContainer:{
        backgroundColor:'#66bfff',
        alignItems: 'center',
        height:'100%',
        minHeight: 100,
        paddingTop: 0,
        paddingLeft: 10,},
      topHomeContainer:{
        justifyContent:'flex-start',
        width:'100%', 
        borderBottomColor: '#111',
        borderBottomWidth:2,
        flexDirection:'row',},
      todoActionContainer:{
        flexDirection:'row',
        alignSelf:'center',
        width:'50%',
        justifyContent:'flex-end',
        paddingRight:10},
      todoActionIcon:{
        height:25,
        width:25,
        marginRight:10},
      //used in flatlist item
      todoContainer:{
        width:'100%',
        borderBottomColor: '#111',
        borderBottomWidth: 1,
        borderLeftColor: '#111',
        borderLeftWidth:2,
        flexDirection: 'column',
        padding:3,
        marginBottom: 2,},
      todoButtonContainer:{
        flexDirection:'row',
        width:'50%',},
      todoTextContainer:{
        flexDirection:'column',
        width:'100%'},
      bold:{
        fontWeight:'bold'},
      isSelected:{
        color:'red'},
      //used in add todo icon
      todoAddContainer:{
        position:'absolute',
        alignItems: 'center',
        justifyContent:'center',
        width:40,
        height:40,
        bottom:20,
        right:20,},
      todoImageAdd:{
        resizeMode:'contain',
        width:45,
        height:45},
      //used In Modal homescreen
      modalBackground:{
        backgroundColor:'rgba(52, 52, 52, 0.8)',
        width:'100%',
        height:'100%'},
      modalMainContainer:{
        marginTop: '15%',
        height:'60%',
        backgroundColor:'#66bfff',
        width:'80%',
        alignSelf:'center',
        borderColor:'#111',
        borderWidth:2,
        borderRadius:5,
        padding:20},
      
      
})
