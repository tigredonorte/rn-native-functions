import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { i18n } from '~app/i18n';

import { initStyle, loadFonts } from './style';
import { theme } from './theme';

export const SplashScreen: React.FC<{theme?: any;}> = (props) => {
    return (
        <PaperProvider theme={ props.theme ?? theme }>
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        </PaperProvider>  
    );
}

export const ThemeInitilizer: React.FC<{ theme?: any; children: any; }> = (props) => {
    const [ appLoaded ] = loadFonts();

    i18n.t('init');
    if (!appLoaded) {
        return (
            <SplashScreen theme={props.theme ?? theme}/>
        );
    }
    initStyle();
    return (
        <PaperProvider theme={props.theme ?? theme}>
            {props.children}
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
});