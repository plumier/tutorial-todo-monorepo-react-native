import React from 'react';
import { ActivityIndicator, Alert, StatusBar, Text, View } from 'react-native';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation';

import { configOnlyIncomplete, setEmail, setUserLogged, storeToken } from '../AsyncStorageFunctions';
import { AxiosInstance } from '../AxiosFunctions';
import BlockBtn from '../components/BlockButton';
import SimpleTextInput from '../components/SimpleTextInput';
import { styles } from '../Styles';


// ##################################################################### //
// ############################# TYPES ################################# //
// ##################################################################### //

interface Props{
    navigation: NavigationScreenProp<any,any>
}
interface State{
    email:string
    password:string
    isLoading:boolean
    isMounted:boolean
}

// ##################################################################### //
// ########################## IMPLEMENTATION ########################### //
// ##################################################################### //

export default class LoginScreen extends React.Component<Props,State>{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            isLoading:false,
            isMounted:true
        }
        StatusBar.setBarStyle( 'dark-content',true)        
    }

// ====================================================== //
// ==================== FUNCTION ======================== //
// ====================================================== //

    async login(){
        if(this.state.email!=''&& this.state.password!=''){
            this.setState({isLoading:true})
            await 
            AxiosInstance
                .post("/auth/login/",{
                    email:this.state.email.toLowerCase(),
                    password:this.state.password
                })
                .then(result=>{
                    if(result){
                        this.setState({isMounted:false})
                        storeToken(result.data.token)
                        setEmail(this.state.email)
                        setUserLogged(true)
                        configOnlyIncomplete('no')
                        console.log(result.data.token)
                        this.props.navigation.dispatch(StackActions.reset({
                            index:0,
                            actions: [NavigationActions.navigate({ routeName: 'Home' })]
                        }))
                    }
                })
                if(this.state.isMounted)
                this.setState({isLoading:false})     
        }else{
            Alert.alert("Please fill the empty field")
        }
    }

// ====================================================== //
// ===================== LAYOUT ========================= //
// ====================================================== //

    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>
                    Welcome to To-do
                </Text>
                <SimpleTextInput 
                    placeholderTextColor='#111' 
                    placeholder='E-mail' 
                    onChangeText={text=>{this.setState({email:text})}} 
                    secureTextEntry={false} />
                <SimpleTextInput 
                    placeholderTextColor='#111' 
                    placeholder='Password' 
                    onChangeText={text=>{this.setState({password:text.toString()})}} 
                    secureTextEntry={true}/>
                <ActivityIndicator 
                    style={{display:this.state.isLoading?'flex':'none',}} 
                    size='large' 
                    animating={this.state.isLoading} color='#111'/>
                <BlockBtn 
                    title='Login' 
                    onPress={()=>{this.login()}}/>
                <BlockBtn 
                    title='Register' 
                    onPress={()=>{this.props.navigation.navigate('Register')}}/>
                <Text style={{textAlign:'center',marginTop:10}}>
                    Please Login or Register if you don't have any account
                </Text>
            </View> 
        );
    }
}