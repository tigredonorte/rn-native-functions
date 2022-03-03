import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Routes } from '~app/routes/routes';
import { AppReducer } from '~app/store/store';
import { ThemeInitilizer } from '~app/styles/themeInitializer';

/**
 * It's important on huge app to improve performance
 */
enableScreens();

export default function App() {
  return (
    <ThemeInitilizer>
       <AppReducer>
          <Routes />
       </AppReducer>
    </ThemeInitilizer>
  );
}
