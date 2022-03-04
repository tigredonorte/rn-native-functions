import { PRODUCTION } from '@env';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { AuthReducer } from '~modules/auth/store/auth.reducer';
import { AuthStateName } from '~modules/auth/store/auth.state';
import { PlacesDb, PlacesReducer, PlacesStateName } from '~modules/places/store/places';

PlacesDb.initPlacesDb().catch(() => console.log('db error'));

const reducers = combineReducers({
    [PlacesStateName]: PlacesReducer,
    [AuthStateName]: AuthReducer,
});
  
const store = createStore(reducers, PRODUCTION === 'true'
    ? applyMiddleware(ReduxThunk)
    : composeWithDevTools(applyMiddleware(ReduxThunk))
);

export const AppReducer: React.FC<{}> = (props) =>{
    return ( 
        <Provider store={store}>
            {props.children}
        </Provider>
    );
}