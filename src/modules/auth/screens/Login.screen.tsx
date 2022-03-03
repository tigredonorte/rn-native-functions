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
import { i18nAuth } from '../i18n';
import { AuthRoutes, AuthStackType } from '../routes/Auth.routes.types';
import { LoginAction } from '../store/auth.action';
import { ILoginModel } from '../store/auth.model';

interface LoginInput extends NativeStackScreenProps<AuthStackType, AuthRoutes.Login> {} 
export const LoginSScreen: React.FunctionComponent<LoginInput> = (props) => {

    const dispatch = useDispatch();
    const [ isSaving, setIsSaving ] = useState(false);

    useEffect(() => {
        props.navigation.setOptions({ title: 'Login' });
    }, []);

    const onSave = useCallback(async(data: ILoginModel) => {
        try {
            setIsSaving(true);
            await dispatch(LoginAction(data));
        } catch (error: any) {
            Alert.alert('Authentication Error', error.message, [{ text: 'Ok' }]);
            setIsSaving(false);
        }
    }, [ setIsSaving ]);

    const formParameters: FormParameters = [
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
                <Title style={Styles.title}>{i18nAuth.t('login.title')}</Title>
                <FormContainerComponent
                    isEditing={false}
                    onSave={(data) => onSave(data as ILoginModel)}
                    formParameters={formParameters}
                    isSaving={false}
                    buttonText="Login"
                ></FormContainerComponent>
                <ToggleLoginSignup goToScreen='signup' navigation={props.navigation}/>
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
