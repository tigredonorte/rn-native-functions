import i18next from 'i18next';
import { NativeModules, Platform } from 'react-native';

import * as langs from './translations/index';

const langsKeys = Object.keys(langs)[0];
i18next.init({
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
  lng: Platform.OS === 'ios' ?
    langsKeys[0] :
    NativeModules.I18nManager.localeIdentifier.slice(0, 2),
  fallbackLng: langsKeys,
  load: 'languageOnly',
  resources: {
    'en': {
      translation: langs.en,
    },
  },
  nsSeparator: '::',
});

export const i18nAuth = i18next;

export default i18next;
