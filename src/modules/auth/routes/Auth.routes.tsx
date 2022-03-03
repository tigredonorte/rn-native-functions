import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginSScreen } from '../screens/Login.screen';
import { LogoutScreen } from '../screens/Logout.screen';
import { RecoverScreen } from '../screens/Recover.screen';
import { SignupScreen } from '../screens/Signup.screen';
import { AuthRoutes } from './Auth.routes.types';

const Stack = createStackNavigator();

export const AuthNavigator: React.FC<{ isSignout: boolean }> = (props) => (
  <Stack.Navigator initialRouteName={AuthRoutes.Login}>
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={AuthRoutes.Login}
        component={LoginSScreen}
        options={{
          animationTypeForReplace: props.isSignout ? 'pop' : 'push',
        }}
      />
      <Stack.Screen
        name={AuthRoutes.Signup}
        component={SignupScreen}
      />
      <Stack.Screen
        name={AuthRoutes.Recover}
        component={RecoverScreen}
      />
      <Stack.Screen
        name={AuthRoutes.Logout}
        component={LogoutScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);
