import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18next from 'i18next';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { ActivityIndicator, Button, Caption, Card, Dialog, IconButton, Paragraph, Portal, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStateContainer } from '~app/components/FetchStatus';

import { PlaceRoutes, PlaceStackType } from '../routes/PlaceNavigator.types';
import { DeletePlacesAction, getPlaceById } from '../store/places';


interface PlaceDetailsInput extends NativeStackScreenProps<PlaceStackType, PlaceRoutes.Details> { } 

export const PlaceDetailsScreen: React.FC<PlaceDetailsInput> = (props) => {

    const place = useSelector(getPlaceById(props.route.params.id));
    const [ spinner, setSpinner ] = useState(false);
    const [ mapRegion, setMapRegion ] = useState<Region>();
    const dispatch = useDispatch();

    const onConfirm = useCallback(async() => {
        try {
            setSpinner(true);
            await dispatch(DeletePlacesAction(props.route.params.id));
            setSpinner(false);
            props.navigation.goBack();
        } catch (error: any) {
            Alert.alert( 'Error', error.message, [
                { text: 'ok', style: 'cancel', onPress: () => setSpinner(false) 
            }]);
        }
    }, []);

    const deleteItem = useCallback(() => {
        const id = props.route.params.id;
        Alert.alert(
            'Are you sure?', 
            "Deletion can't be undone. Do you really want to delete this item?", [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: onConfirm }
            ]
        );
    }, []);

    const editItem = useCallback(() => {
        const id = props.route.params.id;
        const title = props.route.params.title;
        props.navigation.navigate(PlaceRoutes.Edit, { id, title })
    }, []);

    useEffect(() => {
        props.navigation.setOptions({
            title: props.route.params.title,
            headerRight: () => <View style={Styles.btnContainer}>
                <IconButton color='white' icon='pencil-outline' onPress={editItem}/>
                <IconButton color='white' icon='trash-can-outline' onPress={deleteItem}/>
            </View>
        });
    }, []);

    useEffect(() => {
        if (!place) {
            return;
        }

        setMapRegion({
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
            latitude: place.lat,
            longitude: place.lng
        });

    }, [ place ]);

    return (<>
        <FetchStateContainer
            empty={{ isEmpty: !place?.id, emptyBtnText: i18next.t('PlaceDetails.empty') }}
            loading={!place || spinner}
        >
            <Card.Cover source={{ uri: place?.image }} />
            <ScrollView contentContainerStyle={Styles.container}>
                <Card style={Styles.card}>
                    <Card.Content>
                        <MapView region={mapRegion} style={Styles.map}>
                            {mapRegion && <Marker title='Picked location' coordinate={mapRegion}></Marker> }
                        </MapView>
                        <Caption style={Styles.text}>{place?.address}</Caption>
                    </Card.Content>
                </Card>
            </ScrollView>
        </FetchStateContainer>
    </>);
};

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    card: {
        width: '100%',
    },
    map: {
        height: 200
    },
    text: { 
        textAlign: 'center',
        marginVertical: 10
    },
    btnContainer: {
        flexDirection: 'row'
    }
});
