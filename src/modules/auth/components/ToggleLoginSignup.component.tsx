import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { theme } from '~app/styles/theme';

import { AuthRoutes, AuthStackType } from '../routes/Auth.routes.types';

interface ToggleLoginSignupInput {
    goToScreen: 'login' | 'signup';
    navigation: NativeStackNavigationProp<AuthStackType, AuthRoutes>;
};
export const ToggleLoginSignup: React.FC<ToggleLoginSignupInput> = (props) => {
    const navigate = (routeName: AuthRoutes) => props.navigation.navigate(routeName);
    return (
        props.goToScreen === 'signup'
            ? <View style={Styles.containerSignup}>
                <Button onPress={() => navigate(AuthRoutes.Recover)} labelStyle={Styles.button}>Forgot password?</Button>
                <Button onPress={() => navigate(AuthRoutes.Signup)} labelStyle={Styles.buttonMain}>Signup</Button>
            </View>
            : <View style={Styles.containerLogin}>
                <Text style={Styles.button}>Already have account?</Text>
                <Button onPress={() => navigate(AuthRoutes.Login)} labelStyle={Styles.buttonMain}>Login</Button>
            </View>
    );
}

const Styles = StyleSheet.create({
    containerLogin: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 20
    },
    containerSignup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    button: {
        fontSize: 15,
        color: theme.colors.backdrop,
    },
    buttonMain: {
        fontSize: 15,
        padding: 0,
        margin: 0,
        color: theme.colors.accent,
    }
});