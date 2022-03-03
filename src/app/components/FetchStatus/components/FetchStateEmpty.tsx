import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Styles } from './FetchState.style';

export interface FetchStateEmptyInput {
    onEmptyData?: () => void; 
    emptyText?: string;
    emptyBtnText?: string;
}

export const FetchStateEmpty: FunctionComponent<FetchStateEmptyInput> = (props) => (
    <View style={Styles.stateContainer}>
        { 
            props.emptyText &&
            <Text style={Styles.emptyText}> 
                {props.emptyText} 
            </Text>
        }
        { 
            props.emptyBtnText &&
            <Button mode="outlined" onPress={props.onEmptyData}>
                {props.emptyBtnText}
            </Button>
        }
    </View>
);
