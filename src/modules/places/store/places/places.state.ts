import { PlacesModel } from './places.model';

export const PlacesStateName = 'Places';

export interface PlacesState {
    places: PlacesModel[];
};

export interface PlacesFullState {
    [PlacesStateName]: PlacesState;
}

export const initialState: PlacesState = {
    places: []
}
