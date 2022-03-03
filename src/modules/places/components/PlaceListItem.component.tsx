import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PlacesModel } from '../store/places';

interface PlaceListItemInput {
    item: PlacesModel;
    onClick: (data: PlacesModel) => void;
} 

export const PlaceListItemComponent: React.FunctionComponent<PlaceListItemInput> = (props: PlaceListItemInput) => {
    return (
        <View style={Styles.container}>
            <Text>PlaceListItem works!</Text>
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
