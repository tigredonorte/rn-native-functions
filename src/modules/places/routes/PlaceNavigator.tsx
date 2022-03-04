import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';

import { AddPlaceScreen } from '../screens/AddPlace.screen';
import { EditPlaceScreen } from '../screens/EditPlace.screen';
import { PlaceDetailsScreen } from '../screens/PlacesDetails.screen';
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
    initialRouteName={PlaceRoutes.List}
  >
    <Stack.Screen
      name={PlaceRoutes.List}
      component={PlaceListScreen}
      options={props.drawerIconOptions((data: any) => ({
        headerRight: () => (<props.HeaderButton icon='plus' onPress={() => data.navigation.navigate(PlaceRoutes.Add)}/>)
      }))}
    />
    <Stack.Screen
      name={PlaceRoutes.Details}
      component={PlaceDetailsScreen}
    />
    <Stack.Screen
      name={PlaceRoutes.Edit}
      component={EditPlaceScreen}
    />
    <Stack.Screen
      name={PlaceRoutes.Add}
      component={AddPlaceScreen}
    />
  </Stack.Navigator>
);
