import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { HeaderButton } from '~app/components/UI/src/HeaderButton.component';
import { PlaceNavigator } from '~modules/places/routes/PlaceNavigator';

import { CustomDrawerContent } from '../defaults/CustomDrawer';
import { defaultNavigatorOptions, drawerIconOptions } from '../defaults/ScreenOptions';
import { SystemRoutes } from './System.routes.types';

const Drawer = createDrawerNavigator();

const getDrawerOptions = (title: string, icon: string) => ({
  title,
  drawerIcon: ({ size, color }: any): React.ReactNode => (<IconButton icon={icon} size={size} color={color} />),
});

export const SystemNavigator = () => (
  <Drawer.Navigator
    useLegacyImplementation={false}
    screenOptions={{ headerShown: false }}
    drawerContent={(props): React.ReactElement => <CustomDrawerContent {...props} />}
    initialRouteName={SystemRoutes.Places}
  >
    <Drawer.Screen
      name={SystemRoutes.Places}
      options={() => getDrawerOptions('Places', 'city-variant-outline')}
    >
      { 
         data => <PlaceNavigator { ...data }
          HeaderButton={HeaderButton}
          defaultNavigatorOptions={defaultNavigatorOptions}
          drawerIconOptions={drawerIconOptions}
        />
      }
    </Drawer.Screen>
  </Drawer.Navigator>
);
