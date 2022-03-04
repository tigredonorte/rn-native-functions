import * as LocationPicker from 'expo-location';
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Card } from 'react-native-paper';
import { MapPreviewComponent } from './MapPreview.component';

interface LocationPickerInput {
    onLocationTaken: (location: LocationPicker.LocationObjectCoords) => void;
} 

export const LocationPickerComponent: React.FC<LocationPickerInput> = (props) => {

    const [ isLoading, setLoading ] = useState(false);
    const [ location, setLocation ] = useState<LocationPicker.LocationObjectCoords>();

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

            setLocation(coords);
            props.onLocationTaken(coords);
        } catch (error: any) {
            Alert.alert('Could not fetch location', error, [{ text: 'ok' }]);
        }
        setLoading(false);
    }

    return (
        <Card style={!location ? Styles.locationPreview : Styles.locationPreview2} onPress={takeLocation}>
            { location
                ? <MapPreviewComponent location={location} />
                : <Card.Content style={Styles.buttonContainer}>
                    { isLoading
                        ? <ActivityIndicator size='small'/>
                        : <Button onPress={takeLocation} icon="pin-outline"> Get Location </Button>
                    }
                </Card.Content>
            }
        </Card>
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
    buttonContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
