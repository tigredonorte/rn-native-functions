import { LocationObjectCoords } from 'expo-location';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { GOOGLE_MAPS_KEY } from '@env';

interface MapPreviewInput {
    location: LocationObjectCoords
} 

export const MapPreviewComponent: React.FC<MapPreviewInput> = (props) => {

    const { latitude, longitude } = props.location;

    const getUrl = useCallback((lat: number, long: number) => {
        const config = {
            width: 400,
            height: 200,
            zoom: 10,
            mapType: 'roadmap', //satelite
            mapLabel: 'A'
        };
        return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}'+
            '&zoom=${config.zoom}&size=${config.width}x${config.height}&maptype=${config.mapType}`+
            `&markers=color:red%7Clabel:${config.mapLabel}%7C${lat},${long}`+
            `&key=${GOOGLE_MAPS_KEY}`;
    }, [ latitude, longitude ]);

    const url = getUrl(latitude, longitude);

    return (
        !url? <></> : <Card.Cover style={Styles.image} source={{ uri: url }}/>
    );
};

const Styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    }
});
