import * as FileSystem from 'expo-file-system';
import { ThunkDispatch } from 'redux-thunk';
import { PlacesDb } from './places.db';

import { PlacesModel } from './places.model';
import { PlacesState as State } from './places.state';

export enum PlacesActionType {
    List = 'ListPlacesAction',
    Create = 'CreatePlacesAction',
    Update = 'UpdatePlacesAction',
    Delete = 'DeletePlacesAction',
}

export interface IListPlaces { type: PlacesActionType.List; places: PlacesModel[]; };
export const ListPlacesAction = () => {
    return async(dispatch: ThunkDispatch<State, any, IListPlaces>): Promise<void> => {
        try {
            const data = await PlacesDb.listPlace();
            const places: PlacesModel[] = data?.rows?._array || [];
            dispatch({ type: PlacesActionType.List, places });
        } catch (error) {
            throw error;
        }
    };
}

export interface ICreatePlace { type: PlacesActionType.Create; place: PlacesModel };
export const CreatePlacesAction = (place: PlacesModel) => {
    return async(dispatch: ThunkDispatch<State, any, ICreatePlace>): Promise<void> => {
        try {
            const filename = place.image.split('/').pop();
            const newPath = (FileSystem?.documentDirectory || '') + filename;

            await FileSystem.moveAsync({
                from: place.image,
                to: newPath
            });

            place = { ...place, image: newPath };
            const data = await PlacesDb.insertPlace(place);
            dispatch({ type: PlacesActionType.Create, place: { ...place, id: data.insertId } });
        } catch (error) {
            throw error;
        }
    };
}

export interface IUpdatePlace { type: PlacesActionType.Update; place: PlacesModel; id: string; };
export const UpdatePlacesAction = (id: string, place: PlacesModel) => {
    return async(dispatch: ThunkDispatch<State, any, IUpdatePlace>): Promise<void> => {
        try {
            const data = await PlacesDb.editPlace(id, place);
            console.log({ data });
            dispatch({ type: PlacesActionType.Update, id, place });
        } catch (error) {
            throw error;
        }
    };
}

export interface IDeletePlace { type: PlacesActionType.Delete; id: string; };
export const DeletePlacesAction = (id: string) => {
    return async(dispatch: ThunkDispatch<State, any, IDeletePlace>): Promise<void> => {
        try {
            PlacesDb.setDebugMode(true);
            const data = await PlacesDb.deletePlace(id);
            console.log({ data });
            dispatch({ type: PlacesActionType.Delete, id });
        } catch (error) {
            PlacesDb.setDebugMode(false);
            throw error;
        }
    };
}
