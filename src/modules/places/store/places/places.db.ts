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
        return PlacesDb.dbClass.runQuery(
            `CREATE TABLE IF NOT EXISTS ${PlacesDb.tableName} (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                image TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`
        );
    }

    public static insertPlace = (place: PlacesModel): Promise<any> => {
        PlacesDb.dbClass.validate(place, false);
        return PlacesDb.dbClass.runQuery(
            `INSERT INTO ${PlacesDb.tableName} (title, image, address, lat, lng) VALUES (
                ?, ? ,? ,?, ?
            );`,
            [ place.title, place.image, place.address, place.lat, place.lng ]
        );
    }

    public static editPlace = (id: string, place: PlacesModel): Promise<any> => {
        PlacesDb.dbClass.validate(place, true);
        return PlacesDb.dbClass.runQuery(
            ``
        );
    }

    public static deletePlace = (id: string): Promise<any> => {
        return PlacesDb.dbClass.runQuery(
            ``
        );
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