import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStateContainer } from '~app/components/FetchStatus';
import { PlaceListItemComponent } from '../components/PlaceListItem.component';
import { PlaceRoutes, PlaceStackType } from '../routes/PlaceNavigator.types';
import { getPlacesList, ListPlacesAction, PlacesModel } from '../store/places';


interface PlaceListInput extends NativeStackScreenProps<PlaceStackType, PlaceRoutes.PlaceList> { } 

export const PlaceListScreen: FunctionComponent<PlaceListInput> = (props: PlaceListInput) => {
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ isRefreshing, setIsRefreshing ] = useState(false);
    const items = useSelector(getPlacesList);
    const dispatch = useDispatch();
    const navigate = (place: PlacesModel) => props.navigation.navigate(PlaceRoutes.PlaceDetails, { id: place.id, title: place.title });

    const load = useCallback(async() => {
        try {
            setIsRefreshing(true);
            setErrorMessage('');
            await dispatch(ListPlacesAction());
        } catch (error: any) {
            setErrorMessage(error.message);
        }
        setIsRefreshing(false);
    }, [ dispatch, setIsRefreshing, setErrorMessage ])

    // reload data on each visit
    useEffect(
        () => props.navigation.addListener('focus', () => load()), 
        [ load ]
    );

    // load data on first load
    useEffect(() => {
        setLoading(true);
        load().then(() => {
            setLoading(false);
        });
    }, [ load, setLoading ]);

    return (
        <FetchStateContainer
            loading={ loading }
            error={{ hasError: !!errorMessage, errorText: errorMessage, btnText: "Try again", fetchDataFn: load }}
            empty={{ isEmpty: !!items && items?.length === 0, emptyText: "No places found" }}
        >
            <FlatList
                onRefresh={() => load()}
                refreshing={ isRefreshing }
                keyExtractor={(item: PlacesModel) => item.id}
                data={items}
                renderItem={(item) => <PlaceListItemComponent
                    item={item.item}
                    onClick={navigate}
                > 
                    <Button onPress={() => navigate(item.item)}>Details</Button>
                </PlaceListItemComponent>}
            />
        </FetchStateContainer>
    );
};

const Styles = StyleSheet.create({});
