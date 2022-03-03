import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18next from 'i18next';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStateContainer } from '~app/components/FetchStatus';

import { PlaceRoutes, PlaceStackType } from '../routes/PlaceNavigator.types';
import { getPlaceById } from '../store/places';


interface PlaceDetailsInput extends NativeStackScreenProps<PlaceStackType, PlaceRoutes.Details> { } 

export const PlaceDetailsScreen: FunctionComponent<PlaceDetailsInput> = (props: PlaceDetailsInput) => {
    const place = useSelector(getPlaceById(props.route.params.id));
    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setOptions({ title: props.route.params.title });
    }, []);

    return (
        <FetchStateContainer
            empty={{ isEmpty: !place?.id, emptyBtnText: i18next.t('PlaceDetails.empty') }}
            loading={!place}
        >
            <ScrollView contentContainerStyle={Styles.container}>
                <Card style={Styles.card}>
                    <Card.Title title={place?.title} />
                    <Card.Cover source={{ uri: place?.image }} />
                    <Card.Content>
                        <Paragraph>{place?.address}</Paragraph>
                    </Card.Content>
                </Card>
            </ScrollView>
        </FetchStateContainer>
    );
};

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    card: {
        width: '100%',
    }
});
