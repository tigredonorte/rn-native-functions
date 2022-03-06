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

const moveFile = async(image: string): Promise<string> => {
    const filename = image.split('/').pop();
    const newPath = (FileSystem?.documentDirectory || '') + filename;
    await FileSystem.moveAsync({
        from: image,
        to: newPath
    });
    return newPath;
};

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
            place.image = await moveFile(place.image);
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
            const rawPlace = await PlacesDb.getPlace(id);
            if (rawPlace.image !== place.image) {
                place.image = await moveFile(place.image);
                console.log('here');
            }
            if (place.id) {
                // @ts-ignore
                delete place['id'];
            }
            await PlacesDb.editPlace(id, place);
            dispatch({ type: PlacesActionType.Update, id, place });
        } catch (error) {
            console.warn(error);
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
