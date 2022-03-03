import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { PlaceListScreen } from '../screens/PlacesList.screen';

import { PlaceRoutes } from './PlaceNavigator.types';

const Stack = createStackNavigator();

export const PlaceNavigator: React.FC<{ 
  defaultNavigatorOptions: StackNavigationOptions,
  drawerIconOptions: (data: any) => any,
  HeaderButton: React.FC<any>
}> = (props) => (
  <Stack.Navigator
    screenOptions={props.defaultNavigatorOptions}
    initialRouteName={PlaceRoutes.PlaceList}
  >
    <Stack.Screen
      name={PlaceRoutes.PlaceList}
      component={PlaceListScreen}
      options={props.drawerIconOptions(() => ({}))}
    />
  </Stack.Navigator>
);
