import { PlacesFullState, PlacesStateName } from "./places.state";

export const getPlacesState = (state: PlacesFullState) => state[PlacesStateName];
export const getPlacesList = (state: PlacesFullState) => getPlacesState(state)?.places;