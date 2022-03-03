import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';

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

export const ThemeInitilizer = (props: { theme: any; children: any; }) => {
    const [ appLoaded ] = loadFonts();

    if (!appLoaded) {
        return (
            <SplashScreen theme={props.theme}/>
        );
    }
    initStyle();
    return (
        <PaperProvider theme={props.theme}>
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