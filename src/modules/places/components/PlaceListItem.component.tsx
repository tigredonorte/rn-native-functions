import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Subheading, Text, Title } from 'react-native-paper';
import { theme } from '~app/styles/theme';

import { PlacesModel } from '../store/places';

interface PlaceListItemInput {
    item: PlacesModel;
    onClick: (data: PlacesModel) => void;
} 

export const PlaceListItemComponent: React.FC<PlaceListItemInput> = (props) => {
    return (
        <Card style={Styles.card} onPress={() => props.onClick(props.item)}>
            <View style={Styles.container}>
                <Image style={Styles.img} source={{ uri: props.item.image }}/>
                <View style={Styles.contentContainer}>
                    <Title>{props.item.title}</Title>
                    <Subheading>{ props.item.address }</Subheading>
                </View>
            </View>
        </Card>
    );
};

const Styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 15,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 300,
        marginRight: 20
    },
    contentContainer: {
        justifyContent: 'center'
    }
});
