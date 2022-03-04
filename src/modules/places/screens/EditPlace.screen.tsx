import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18next from 'i18next';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStateLoading } from '~app/components/FetchStatus';
import { FormContainerComponent } from '~app/components/Form';

import { getFormParameters } from '../models/placeFormParameters';
import { PlaceRoutes, PlaceStackType } from '../routes/PlaceNavigator.types';
import { getPlaceById, UpdatePlacesAction } from '../store/places';


interface EditPlaceInput extends NativeStackScreenProps<PlaceStackType, PlaceRoutes.Edit> { }

export const EditPlaceScreen: FunctionComponent<EditPlaceInput> = (props) => {

    let formParameters;
    const [ isSaving, setIsSaving ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState<string>();
    const place = useSelector(getPlaceById(props.route.params?.id ?? ''));
    const dispatch = useDispatch();

    useEffect(() => props.navigation.setOptions({ title: props.route.params?.title ?? '' }), []);

    useEffect(() => {
        if (place) {
            formParameters = getFormParameters(place);
        }
    }, [ place, formParameters ]);

    useEffect(() => {
        if (errorMessage) {
            Alert.alert(i18next.t('FormError.title'), errorMessage, [{ text: i18next.t('FormError.ok') }]);
        }
    }, [ errorMessage ]);

    const onSave = useCallback(async(data: any) => {
        try {
            setErrorMessage(undefined);
            setIsSaving(true);
            data = { 
                ...data,
                lat: data?.address?.latitude,
                lng: data?.address?.longitude,
                address: data?.address?.address,
            };
            await dispatch(UpdatePlacesAction(props?.route?.params?.id ?? '', data))
            props.navigation.goBack();
        } catch (error: any) {
            setErrorMessage(error.message);
        }
        setIsSaving(false);
    }, [ setIsSaving, setErrorMessage ]);

    if (!formParameters) {
        return <FetchStateLoading />
    }

    return (
        <FormContainerComponent
            isEditing={true}
            onSave={onSave}
            formParameters={formParameters}
            isSaving={isSaving}
            buttonText={i18next.t('Save')}
        />
    );
};
