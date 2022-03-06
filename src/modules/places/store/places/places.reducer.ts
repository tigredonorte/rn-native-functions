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
    [Actions.PlacesActionType.Update]: (state, action: Actions.IUpdatePlace) => {
        const places = [ ...state.places ];
        const index = places.findIndex(it => action.id === it.id);
        places[index] = {
            ...places[index],
            ...action.place
        };

        return {
            ...state,
            places: [ ...places ]
        }
    },
    [Actions.PlacesActionType.Delete]: (state, action: Actions.IDeletePlace) => ({
        ...state,
        places: state.places.filter(place => place.id !== action.id)
    })
});
