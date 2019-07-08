import React from 'react';
import { Button, NativeSyntheticEvent, NativeTouchEvent, View } from 'react-native';

import { styles } from './Styles';


export default function BlockBtn(
    props: { 
        title: string, 
        onPress: (ev:NativeSyntheticEvent<NativeTouchEvent>)=>void 
    }){
    return (
        <View style={styles.buttonContainer}>
            <Button 
                color='#111' 
                title={props.title} 
                onPress={props.onPress} />
        </View>
    );
}