import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { theme } from '~app/styles/theme';

export const defaultNavigatorOptions = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTintColor: theme.colors.white
};

export const drawerIconOptions = (extraParams: (dt: any) => any) => (data: any) => ({
  headerLeft: () => (
    <View style={Styles.container}>
      <IconButton icon='menu' color={theme.colors.light_grey} onPress={() => {
        data.navigation.toggleDrawer();
      }} />
    </View>
  ),
  ...extraParams(data)
});

const Styles = StyleSheet.create({
  container: { 
    flexDirection: 'row'
  },
});