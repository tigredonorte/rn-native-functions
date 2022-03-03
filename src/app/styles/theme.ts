import { DefaultTheme } from 'react-native-paper';

export const fontNames = {
    LatoThin: 'Lato_100Thin',
    LatoLight: 'Lato_300Light',
    Lato: 'Lato_400Regular',
    LatoBold: 'Lato_700Bold',
}

export const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#4F9F64',
        accent: '#D49F6A',
        background: '#f1f1f1',
        surface: '#DEDEDE',
        onSurface: '#DEDEDE',
        text: '#555b5b',
        disabled: '#C3C6C6',
        error: '#DE1F79',
        placeholder: '#2D2D2D',
        backdrop: '#f1f1f1',
        notification: '#FF9023'
    },
    fonts: {
        ...DefaultTheme.fonts,
        thin: {
            fontFamily: fontNames.LatoThin,
            fontWeight: '100'
        },
        light: {
            fontFamily: fontNames.LatoLight,
            fontWeight: '300'
        },
        regular: {
            fontFamily: fontNames.Lato,
            fontWeight: '400'
        },
        medium: {
            fontFamily: fontNames.LatoBold,
            fontWeight: '700'
        },
    }
};
