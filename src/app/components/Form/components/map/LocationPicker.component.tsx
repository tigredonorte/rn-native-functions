import { GOOGLE_MAPS_KEY } from '@env';
import * as LocationPicker from 'expo-location';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { LatLng } from 'react-native-maps';
import { ActivityIndicator, Button, Card, Dialog, Portal } from 'react-native-paper';

import { LocationPickerMapComponent } from './LocationPickerMap.component';
import { MapPreviewComponent } from './MapPreview.component';

interface LocationPickerInput {
    onLocationTaken: (location: LatLng) => void;
    onClearLocation: () => void;
} 

export const LocationPickerComponent: React.FC<LocationPickerInput> = (props) => {

    const [ showDialog, setShowDialog ] = useState(false);
    const [ isLoading, setLoading ] = useState(false);
    const [ location, setLocation ] = useState<LatLng & { address: string }>();

    const requestPermission = async() => {
        const { status } = await LocationPicker.requestForegroundPermissionsAsync();
        if ( status !== 'granted') {
            throw new Error('You need to grant a location permission to use this app');
        }
    }

    const checkLocationService = async() => {
        const status = await LocationPicker.getProviderStatusAsync();
        if (!status.locationServicesEnabled) {
            throw new Error('Location services disabled');
        }
    }

    const getCurrentPosition = async() => {
        const location = await LocationPicker.getCurrentPositionAsync({});
        return location.coords;
    }

    const getAddress = async(coord: LatLng) => {

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            coord.latitude
        },${coord.longitude}&key=${GOOGLE_MAPS_KEY}`;

        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error(`Can't get address`);
        }
        const result = await resp.json();
        return result?.results[0]?.formatted_address;
    }

    const save = async(coords: LatLng) => {
        const address = await getAddress(coords);
        const data = { ...coords, address };
        setLocation(data);
        props.onLocationTaken(data);
    }

    const takeLocation = async() => {
        try {
            if (isLoading) {
                return;
            }
            setLocation(undefined);
            setLoading(true);
            await checkLocationService();
            await requestPermission();
            const coords = await getCurrentPosition();
            await save(coords);
        } catch (error: any) {
            Alert.alert('Could not fetch location', error, [{ text: 'ok' }]);
        }
        setLoading(false);
    }

    const pickOnMap = (data = true) => setShowDialog(data);
    const pickPlace = async(coords: LatLng) => {
        setShowDialog(false);
        await save(coords);
    }
    const resetLocation = () => {
        setLocation(undefined);
    }

    return (
        <>
            <Portal>
                <Dialog visible={showDialog} onDismiss={() => pickOnMap(false)}>
                    <LocationPickerMapComponent place={{ latitude: 37, longitude: -122 }} onPickPlace={pickPlace} />
                </Dialog>
            </Portal>
            <Card style={!location ? Styles.locationPreview : Styles.locationPreview2} onPress={resetLocation}>
                { location
                    ? <MapPreviewComponent location={location} />
                    : <Card.Content style={Styles.cardContent}>
                        { isLoading
                            ? <ActivityIndicator size='small'/>
                            : <View style={Styles.buttonContainer}>
                                <Button onPress={takeLocation}> Location </Button>
                                <Button onPress={pickOnMap}> Pick on map </Button>
                            </View>
                        }
                    </Card.Content>
                }
            </Card>
        </>
    );
};

const Styles = StyleSheet.create({
    locationPreview: {
        flex: 1,
    },
    locationPreview2: {
        flex: 1,
        height: 200,
    },
    cardContent: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row'
    }
});
