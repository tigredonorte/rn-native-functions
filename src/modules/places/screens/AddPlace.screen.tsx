import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18next from 'i18next';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { FetchStateLoading } from '~app/components/FetchStatus';
import { FormContainerComponent } from '~app/components/Form';
import { getFormParameters } from '../models/placeFormParameters';

import { PlaceRoutes, PlaceStackType } from '../routes/PlaceNavigator.types';
import { CreatePlacesAction } from '../store/places';


interface AddPlaceInput extends NativeStackScreenProps<PlaceStackType, PlaceRoutes.Add> { }

export const AddPlaceScreen: FunctionComponent<AddPlaceInput> = (props) => {

    const [ formParameters, setFormParameters ] = useState(getFormParameters());
    const [ isSaving, setIsSaving ] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => props.navigation.setOptions({ title: i18next.t('AddPlace.title') }), []);

    const showError = (err: string) => Alert.alert(i18next.t('FormError.title'), err, [{ text: i18next.t('FormError.ok') }]);

    const onSave = useCallback(async(data: any) => {
        try {
            setIsSaving(true);
            data = {
                ...data,
                lat: data?.address?.latitude,
                lng: data?.address?.longitude,
                address: data?.address?.address,
            };
            setFormParameters(getFormParameters(data));
            await dispatch(CreatePlacesAction(data));
            props.navigation.goBack();
        } catch (error: any) {
            showError(error.message);
        }
        setIsSaving(false);
    }, [ setIsSaving ]);

    if (!formParameters) {
        return <FetchStateLoading />
    }

    return (
        <FormContainerComponent
            isEditing={isSaving}
            onSave={onSave}
            formParameters={formParameters}
            isSaving={isSaving}
            buttonText={i18next.t('Save')}
        />
    );
};
