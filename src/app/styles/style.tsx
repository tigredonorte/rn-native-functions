import {
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    useFonts,
} from '@expo-google-fonts/lato';
import { setCustomText } from 'react-native-global-props';

import { fontSizer } from './responsiveness';
import { theme } from './theme';

export const loadFonts = () => {
    return useFonts({
        Lato_100Thin,
        Lato_100Thin_Italic,
        Lato_300Light,
        Lato_300Light_Italic,
        Lato_400Regular,
        Lato_400Regular_Italic,
        Lato_700Bold,
        Lato_700Bold_Italic,
    });
}

export const initStyle = () => {
    setCustomText({ 
        style: { 
          fontFamily: theme.fonts.regular.fontFamily,
          fontSize: fontSizer()
        }
    });
}
