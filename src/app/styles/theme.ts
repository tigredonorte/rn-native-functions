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
        primary: '#00A22B',
        accent: '#D96C00',
        background: '#ffffff',
        surface: '#e1e1e1',
        onSurface: '#DEDEDE',
        text: '#222',
        disabled: '#C3C6C6',
        error: '#FF0079',
        placeholder: '#a2a2a2',
        backdrop: '#f1f1f1',
        notification: '#FF9023',
        white: '#f1f1f1'
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
