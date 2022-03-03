import React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import env from '~environments';
import { Provider } from 'react-redux';
import { AuthReducer } from '~modules/auth/store/auth.reducer';
import { AuthStateName } from '~modules/auth/store/auth.state';
import { PlacesDb, PlacesReducer, PlacesStateName } from '~modules/places/store/places/index';

PlacesDb.initPlacesDb().catch(() => console.log('db error'));

const reducers = combineReducers({
    [PlacesStateName]: PlacesReducer,
    [AuthStateName]: AuthReducer,
});
  
const store = createStore(reducers, env.production
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