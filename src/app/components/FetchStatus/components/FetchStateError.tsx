import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Styles } from './FetchState.style';

export interface FetchStateErrorInput {
    fetchDataFn?: () => void; 
    errorText: string;
    btnText?: string;
}
export const FetchStateError: FunctionComponent<FetchStateErrorInput> = (props) => (
    <View style={Styles.stateContainer}>
        <Text style={Styles.errorText}> {props.errorText} </Text>
        { 
            props.btnText &&
            <Button mode="outlined" onPress={props.fetchDataFn}>
                {props.btnText}
            </Button>
        }
    </View>
);
