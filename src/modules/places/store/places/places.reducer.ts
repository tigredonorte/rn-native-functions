import { GenericReducer } from '~app/utils/reduxUtilities';

import * as Actions from './places.action';
import { initialState, PlacesState as State } from './places.state';

export const PlacesReducer = GenericReducer<State, any>(initialState, {
    [Actions.PlacesActionType.List]: (state, action: Actions.IListPlaces): State => ({
        ...state,
        places: action.places
    }),
    [Actions.PlacesActionType.Create]: (state, action: Actions.ICreatePlace) => ({
        ...state,
        places: [
            ...state.places,
            action.place
        ]
    }),
    [Actions.PlacesActionType.Update]: (state, action: Actions.IUpdatePlace) => ({
        ...state,
        places: state.places.map(place => place.id === action.id ? action.place : { ...action.place, ...place })
    }),
    [Actions.PlacesActionType.Delete]: (state, action: Actions.IDeletePlace) => ({
        ...state,
        places: state.places.filter(place => place.id !== action.id)
    })
});
