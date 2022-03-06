import * as Sqlite from 'expo-sqlite';
import { Db } from '~app/utils/db/db.class';

import { PlacesModel, PlaceValidation } from './places.model';

export class PlacesDb {

    public static entity = PlaceValidation;
    private static tableName = 'places';
    private static dbClass = new Db<PlacesModel>(
        false, 
        Sqlite.openDatabase('places.db'),
        PlacesDb.tableName,
        PlacesDb.entity
    );

    public static setDebugMode(debug: boolean) {
        PlacesDb.dbClass.debug = debug;
    }

    public static initPlacesDb = (): Promise<any> => {
        return PlacesDb.dbClass.createTable();
    }

    public static insertPlace = (place: PlacesModel): Promise<any> => {
        return PlacesDb.dbClass.add(place);
    }

    public static editPlace = (id: string, place: PlacesModel): Promise<any> => {
        return PlacesDb.dbClass.edit(id, place);
    }

    public static deletePlace = (id: string): Promise<any> => {
        return PlacesDb.dbClass.deleteById(id);
    }

    public static listPlace = (): Promise<any> => {
        return PlacesDb.dbClass.paginate();
    }

    public static getPlace = (id: string): Promise<any> => {
        return PlacesDb.dbClass.runQuery(
            `Select * from ${PlacesDb.tableName} WHERE id='${id}'`
        );
    }

}