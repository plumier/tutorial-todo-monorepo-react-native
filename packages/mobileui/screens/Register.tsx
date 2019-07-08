import React from 'react';
import { ActivityIndicator, Alert, StatusBar, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

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
    name:string
    email:string
    password:string
    confirmPassword:string
    isLoading:boolean
}

// ##################################################################### //
// ########################## IMPLEMENTATION ########################### //
// ##################################################################### //

export default class RegisterScreen extends React.Component<Props,State>{
    constructor(props){
        super(props)
        this.state={
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
            isLoading:false
        }
        StatusBar.setBarStyle( 'dark-content',true)
    }

// ====================================================== //
// ====================== FUNCTION ====================== //
// ====================================================== //

    async register(){
        if(this.state.name !='' && this.state.email !='' && this.state.password !='' && this.state.password == this.state.confirmPassword){
            this.setState({isLoading:true})
            await
            AxiosInstance.post(
                    "/api/v1/users",{
                    name:this.state.name,
                    email:this.state.email.toLowerCase(),
                    password:this.state.password
                }).then(result=>{
                    if(result){
                        Alert.alert("Success, please login")
                        //navigate to login screen
                        this.setState({isLoading:false})
                        this.props.navigation.navigate('Login');
                    }   
                })
                this.setState({isLoading:false})   
        }else{
            if(this.state.password!=this.state.confirmPassword && this.state.password!='' && this.state.confirmPassword!=''){
                Alert.alert("Password doesn't match")
                this.setState({password:'',confirmPassword:''})
            }else{
                Alert.alert("Please fill all the emptyfield")
            }
        }
    }

// ====================================================== //
// ===================== LAYOUT ========================= //
// ====================================================== //

    render(){
        return(
            <View style={styles.container}> 
                <Text 
                    style={{fontSize:20,fontWeight:'bold'}}>
                        Register
                </Text>
                <SimpleTextInput 
                    placeholderTextColor='#111' 
                    placeholder='Name' 
                    onChangeText={text=>{this.setState({name:text})}} 
                    secureTextEntry={false} />
                <SimpleTextInput 
                    placeholderTextColor='#111' 
                    placeholder='E-mail' 
                    onChangeText={text=>{this.setState({email:text})}} 
                    secureTextEntry={false} />
                <SimpleTextInput 
                    value={this.state.password} placeholderTextColor='#111' 
                    placeholder='Password' 
                    onChangeText={text=>{this.setState({password:text})}} 
                    secureTextEntry={true} />
                <SimpleTextInput 
                    value={this.state.confirmPassword} 
                    placeholderTextColor='#111' 
                    placeholder='Confirm Password' 
                    onChangeText={text=>{this.setState({confirmPassword:text})}} 
                    secureTextEntry={true} />
                <ActivityIndicator 
                    style={{display:this.state.isLoading?'flex':'none',}} 
                    size='large' 
                    animating={this.state.isLoading} color='#111'/>
                <BlockBtn 
                    title='Register' 
                    onPress={()=>{this.register()}}/>
                <BlockBtn 
                    title='Login' 
                    onPress={()=>{this.props.navigation.navigate('Login')}}/>
                <Text 
                    style={{textAlign:'center',marginTop:10}}>
                        Please Login or Register if you don't have any account
                </Text>
            </View> 
        );
    }
}