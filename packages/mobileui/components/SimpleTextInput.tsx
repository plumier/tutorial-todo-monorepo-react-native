import React from 'react';
import { StyleProp, TextInput, TextStyle, View } from 'react-native';

import { styles } from './Styles';


export default function EditText(
    props : {
        style ?: StyleProp<TextStyle>, 
        value ?: string, 
        placeholderTextColor ?: string, 
        placeholder ?: string, 
        onChangeText ?: (text:string)=>void,
        secureTextEntry ?: boolean
    }){
    return (
        <View style={styles.inputTextContainer}>
            <TextInput 
                style={props.style}
                value={props.value}
                placeholderTextColor={props.placeholderTextColor} 
                placeholder={props.placeholder} 
                onChangeText={props.onChangeText} 
                secureTextEntry={props.secureTextEntry}/>
        </View>
    );
}

