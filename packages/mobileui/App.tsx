import React from 'react';
import { Alert, Button, Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  DrawerItems,
  NavigationActions,
  NavigationScreenProp,
  StackActions,
} from 'react-navigation';

import { clearUserCredentials, setUserLogged, userIsLogged } from './AsyncStorageFunctions';
import { apiUrl, setAxiosDefaultUrl } from './AxiosFunctions';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import ProfileScreen from './screens/Profile';
import RegisterScreen from './screens/Register';




// ##################################################################### //
// ################################ TYPES ############################## //
// ##################################################################### //

interface Props{
  navigation : NavigationScreenProp<any,any>
}
interface State{
  isLogged:boolean
}

// ##################################################################### //
// ########################### IMPLEMENTATION ########################## //
// ##################################################################### //

 class App extends React.Component<Props,State>{
  constructor(props){
    super(props)
    this.state={
      isLogged:false
    }
    setAxiosDefaultUrl()
  }

// ====================================================== //
// ====================== FUNCTION ====================== //
// ====================================================== //

  async isLogin(){
    let isLogged=await userIsLogged()
    //To dispatch this screen so the user cannot go back to login screen if already logged
    //and go to Home screen
    if(apiUrl!=("" as string)){
      if(isLogged){
        this.props.navigation.dispatch(StackActions.reset({
          index:0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })]
        }))
      }else{
        this.props.navigation.dispatch(StackActions.reset({
          index:0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })]
        }))
      }
    }
  }
  componentWillMount() {
    this.isLogin()
  }

// ====================================================== //
// ======================= LAYOUT ======================= //
// ====================================================== //

  render(){
    return (
    <View style={{
        alignContent:"center",
        alignSelf:"center",
        height:'100%',
        paddingTop:'50%'}}>
      <Text>
        Please open packages/mobileui/AxiosFunction.ts to continue
      </Text>
    </View>)
  }
}

//layout for the drawer
const DrawerContent = (props) => (
  <View>
    <View 
      style={{
        backgroundColor: '#66bfff',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    > 
      <Text 
        style={{
          color: 'white', 
          fontSize: 30 ,
          marginBottom:5}}>
        Do todo!
      </Text>
      <Button title="log out"
        onPress={()=>{
          Alert.alert("Do you want to log out?",'',[
            {
              text:"Cancel",
              onPress:()=>{},
              style:'cancel'
            },{
              text:"Yes",
              onPress:()=>{
                clearUserCredentials();
                setUserLogged(false);
                props.navigation.dispatch(StackActions.reset({
                  index:0,
                  actions: [NavigationActions.navigate({ routeName: 'Login' })]
                }))
              }
            }
          ])
      
      }}/>
    </View>
    <DrawerItems {...props} />
  </View>
)

// ##################################################################### //
// ############################# NAVIGATOR ############################# //
// ##################################################################### //

//Drawer navigator as the container of home and profile screen
const MyDrawerNavigator = createDrawerNavigator({
    Home:     {screen: HomeScreen},
    Profile:  {screen: ProfileScreen,},
},{
    initialRouteName: 'Home',
    contentComponent: DrawerContent
})

const DrawerNavContainer= createStackNavigator({
  Main:{screen:MyDrawerNavigator,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#66bfff',color:'#111', },
      headerTintColor: '#111',
      //hamburger menu
      headerLeft:(
      <TouchableOpacity 
        onPress={()=>{navigation.toggleDrawer()}} 
        style={{marginLeft:15}}>
          <Image 
            style={{height:30,width:30}} 
            source={require('./icons/menu.png')}/>
      </TouchableOpacity>)
    })
  }
},{
  headerMode:'float',
})

const AppNav=createStackNavigator({
  Welcome :   App,
  Login :     {screen : LoginScreen },
  Register :  {screen : RegisterScreen },
  Home :      {screen : DrawerNavContainer}
},
{
  initialRouteName: 'Welcome',
  headerMode:'none',
})

export default createAppContainer(AppNav)




