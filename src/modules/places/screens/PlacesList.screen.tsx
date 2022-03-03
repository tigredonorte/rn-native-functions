import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18next from 'i18next';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStateContainer } from '~app/components/FetchStatus';

import { PlaceListItemComponent } from '../components/PlaceListItem.component';
import { PlaceRoutes, PlaceStackType } from '../routes/PlaceNavigator.types';
import { getPlacesList, ListPlacesAction, PlacesModel } from '../store/places';

interface PlaceListInput extends NativeStackScreenProps<PlaceStackType, PlaceRoutes.List> { } 

export const PlaceListScreen: FunctionComponent<PlaceListInput> = (props: PlaceListInput) => {
    const [ errorText, setErrorText ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ isRefreshing, setIsRefreshing ] = useState(false);
    const items = useSelector(getPlacesList);
    const dispatch = useDispatch();
    const navigate = (place: PlacesModel) => props.navigation.navigate(PlaceRoutes.Details, { id: place.id, title: place.title });

    const fetchDataFn = useCallback(async() => {
        try {
            setIsRefreshing(true);
            setErrorText('');
            await dispatch(ListPlacesAction());
        } catch (error: any) {
            setErrorText(i18next.t(error.message));
        }
        setIsRefreshing(false);
    }, [ dispatch, setIsRefreshing, setErrorText ])

    // reload data on each visit
    useEffect(() => props.navigation.addListener('focus', () => fetchDataFn())
    , [ fetchDataFn ]);

    // load data on first load
    useEffect(() => {
        setLoading(true);
        fetchDataFn().then(() => {
            setLoading(false);
        });
    }, [ fetchDataFn, setLoading ]);

    return (
        <FetchStateContainer
            loading={ loading }
            error={{ errorText: errorText, btnText: i18next.t('PlaceList.errorBtn'), fetchDataFn }}
            empty={{ isEmpty: items?.length < 1, emptyText: i18next.t('PlaceList.empty') }}
        >
            <FlatList
                onRefresh={() => fetchDataFn()}
                refreshing={ isRefreshing }
                keyExtractor={(item: PlacesModel) => item.id}
                data={items}
                renderItem={(item) => <PlaceListItemComponent
                    item={item.item}
                    onClick={navigate}
                > 
                    <Button onPress={() => navigate(item.item)}>{i18next.t('PlaceList.seePlace')}</Button>
                </PlaceListItemComponent>}
            />
        </FetchStateContainer>
    );
};

const Styles = StyleSheet.create({});
