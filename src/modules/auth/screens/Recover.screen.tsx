import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface RecoverInput extends NativeStackScreenProps<any> { } 

export const RecoverScreen: React.FunctionComponent<RecoverInput> = (props: RecoverInput) => {
    return (
        <View style={Styles.container}>
            <Text>Recover Screen works!</Text>
        </View>
    );
};


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
