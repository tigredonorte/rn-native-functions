import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { FetchStateLoading } from '~app/components/FetchStatus';

import { AuthRoutes, AuthStackType } from '../routes/Auth.routes.types';
import { logoutAction } from '../store/auth.action';

interface LogoutInput extends NativeStackScreenProps<AuthStackType, AuthRoutes.Logout> {} 
export const LogoutScreen: React.FunctionComponent<LogoutInput> = (props) => {

    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const doLogout = async() => {
            try {
                setIsLoading(true);
                await dispatch(logoutAction());
            } catch (error) {/**silent fail */}
            setIsLoading(false);
        }

        doLogout();
    }, []);

    return (
        <FetchStateLoading />
    );
};

const Styles = StyleSheet.create({});
