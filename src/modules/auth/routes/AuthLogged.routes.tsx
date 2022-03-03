import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { defaultNavigatorOptions } from '~app/routes/defaults/ScreenOptions';

import { LogoutScreen } from '../screens/Logout.screen';
import { AuthRoutes } from './Auth.routes.types';

const Stack = createStackNavigator();

export const AuthLoggedNavigator: React.FC<{ isSignout: boolean }> = (props) => (
  <Stack.Navigator initialRouteName={AuthRoutes.Login}>
    <Stack.Group screenOptions={defaultNavigatorOptions}>
      <Stack.Screen
        name={AuthRoutes.Logout}
        component={LogoutScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);
