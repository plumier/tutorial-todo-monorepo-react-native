import React from 'react';
import { Alert, Text, View, StatusBar } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation';

import { getEmail, setUserLogged } from '../AsyncStorageFunctions';
import BlockBtn from '../components/BlockButton';
import { styles } from '../Styles';


// ##################################################################### //
// ############################# TYPES ################################# //
// ##################################################################### //

interface Props{
    navigation: NavigationScreenProp<any,any>
}

interface State{
    email:string
}

// ##################################################################### //
// ########################## IMPLEMENTATION ########################### //
// ##################################################################### //

export default class ProfileScreen extends React.Component<Props,State>{
    static navigationOptions = {
        drawerLabel: 'Profile',
    }
    constructor(props){
        super(props)
        this.state={
            email:''
        }
        StatusBar.setBarStyle( 'dark-content',true)
    }   

// ====================================================== //
// ====================== FUNCTION ====================== //
// ====================================================== //

    async getEmail(){
        const value=await getEmail()
        this.setState({email:value})
    }
    componentWillMount(){
        this.getEmail()
    }

// ====================================================== //
// ======================= LAYOUT ======================= //
// ====================================================== //

    render(){
        return(
            <View style={styles.container}>
                <Text>You Are Logged in as</Text>
                <Text>{this.state.email}</Text>
                <BlockBtn title="Log Out" 
                onPress={()=>{
                    Alert.alert("Do you want to log out?",'',[
                      {
                        text:"Cancel",
                        onPress:()=>{},
                        style:'cancel'
                      },{
                        text:"Yes",
                        onPress:()=>{
                          setUserLogged(false);
                          this.props.navigation.dispatch(StackActions.reset({
                            index:0,
                            actions: [NavigationActions.navigate({ routeName: 'Login' })]
                          }))
                        }
                      }
                    ])
                }}/>
            </View> 
        );
    }
}