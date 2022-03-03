import i18next from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { theme } from '~app/styles/theme';

export const defaultNavigatorOptions = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTintColor: theme.colors.white,
  headerTitle: (data: any) => {
    let title = i18next.t(`${data.children}.title`);
    if (title === `${data.children}.title`) {
      title = data.children;
    }
    return (
      <Text style={Styles.text}> {title}</Text>
    )
  },
};

export const drawerIconOptions = (extraParams: (dt: any) => any) => (data: any) => ({
  headerLeft: () => (
    <View style={Styles.container}>
      <IconButton icon='menu' color={theme.colors.white} onPress={() => {
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
  text: {
    color: theme.colors.white
  }
});