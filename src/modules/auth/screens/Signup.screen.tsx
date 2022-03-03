import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {
    creatFormBase,
    FormContainerComponent,
    FormParameters,
    ValidateEmail,
    ValidateMinLength,
    ValidateRequired,
} from '~app/components/Form';

import { ToggleLoginSignup } from '../components/ToggleLoginSignup.component';
import { AuthRoutes, AuthStackType } from '../routes/Auth.routes.types';
import { SignupAction } from '../store/auth.action';
import { ISignupModel } from '../store/auth.model';

interface SignupInput extends NativeStackScreenProps<AuthStackType, AuthRoutes.Signup> {} 
export const SignupScreen: React.FC<SignupInput> = (props) => {

    const dispatch = useDispatch();
    const [ isSaving, setIsSaving ] = useState(false);

    useEffect(() => {
        props.navigation.setOptions({ title: 'Login' });
    }, []);

    const onSave = useCallback(async(data: ISignupModel) => {
        try {
            setIsSaving(true);
            await dispatch(SignupAction(data));
        } catch (error: any) {
            Alert.alert('Authentication Error', error.message, [{ text: 'Ok' }]);
        }
        setIsSaving(false);
    }, [ setIsSaving ]);

    const formParameters: FormParameters = [
        // creatFormBase({
        //     key: 'name',
        //     formType: 'text',
        //     title: "Name",
        //     validationFn: [
        //         ValidateRequired
        //     ]
        // }),
        creatFormBase({
            key: 'email',
            formType: 'email',
            title: "Email",
            validationFn: [
                ValidateRequired,
                ValidateMinLength(5),
                ValidateEmail
            ]
        }),
        creatFormBase({
            key: 'password',
            value: '',
            formType: 'password',
            title: "Password",
            validationFn: [
                ValidateRequired,
                ValidateMinLength(5)
            ],
        }),
    ];

    return (
        <View style={Styles.container}>
            <Card style={Styles.card}>
                <Title style={Styles.title}>Create your new account</Title>
                <FormContainerComponent
                    isEditing={false}
                    onSave={(data) => onSave(data as ISignupModel)}
                    formParameters={formParameters}
                    isSaving={isSaving}
                    buttonText="Signup"
                ></FormContainerComponent>
                <ToggleLoginSignup goToScreen='login' navigation={props.navigation}/>
            </Card>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    card: {
        paddingHorizontal: 15,
        paddingVertical: 25,
    },
    title: {
        textAlign: 'center'
    }
});
