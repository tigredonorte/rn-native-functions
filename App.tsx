import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { Routes } from '~app/routes/routes';
import { theme } from '~app/styles/theme';
import { ThemeInitilizer } from '~app/styles/themeInitializer';
import env from '~environments';
import { AuthReducer } from '~modules/auth/store/auth.reducer';
import { AuthStateName } from '~modules/auth/store/auth.state';
import { PlacesReducer, PlacesStateName } from '~modules/places/store/places';

const reducers = combineReducers({
  [PlacesStateName]: PlacesReducer,
  [AuthStateName]: AuthReducer,
});

const store = createStore(reducers, env.production
  ? applyMiddleware(ReduxThunk)
  : composeWithDevTools(applyMiddleware(ReduxThunk))
);

/**
 * It's important on huge app to improve performance
 */
enableScreens();

export default function App() {
  return (
    <ThemeInitilizer theme={theme}>
       <ReduxProvider store={store}>
          <Routes />
       </ReduxProvider>
    </ThemeInitilizer>
  );
}
