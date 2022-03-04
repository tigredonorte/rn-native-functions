import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { Button } from 'react-native-paper';

interface item {
    latitude: number; 
    longitude: number;
}
interface LocationPickerMapInput {
    place: {
        latitude: number;
        longitude: number;
    };
    onPickPlace: (item: item) => void;
} 

export const LocationPickerMapComponent: React.FC<LocationPickerMapInput> = (props) => {

    const [ location, setLocation ] = useState<item>();

    const pickPlace = async(event: MapEvent) => {
        const coord = event.nativeEvent.coordinate;
        setLocation(coord);
    };

    const save = () => props.onPickPlace(props.place ?? location);

    const mapRegion = {
        latitudeDelta: 0.1,
        longitudeDelta: 0.05,
        ...props.place,
        ...location
    };

    return (
        <>
            <MapView region={mapRegion} style={Styles.map} onPress={pickPlace}>
                { location && <Marker title='Piced location' coordinate={location}></Marker> } 
            </MapView>
            <Button style={Styles.button} mode='contained' onPress={save}>Save</Button>
        </>
    );
};

const Styles = StyleSheet.create({
    map: {
        height: Dimensions.get('window').height * .75
    },
    button: {
        marginTop: 10
    }
});
