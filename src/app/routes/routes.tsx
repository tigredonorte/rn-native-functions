import { NavigationContainer } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { AuthHandler } from '~modules/auth/routes/AuthHandler';

import { SystemNavigator } from './navigator/System.routes';

export const Routes: FunctionComponent<{}> = (props) => {
    return (
        <NavigationContainer>
            <AuthHandler>
                <SystemNavigator />
                { props.children }
            </AuthHandler>
        </NavigationContainer>
    );
};