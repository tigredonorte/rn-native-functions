import * as Sqlite from 'expo-sqlite';

import { PlacesModel } from './places.model';

export class PlacesDb {

    private static db = Sqlite.openDatabase('places.db');
    private static tableName = 'places';
    public static debug = false;

    public static initPlacesDb = (): Promise<any> => {
        return PlacesDb.runQuery(
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
        return PlacesDb.runQuery(
            `INSERT INTO ${PlacesDb.tableName} (title, image, address, lat, lng) VALUES (
                ?, ? ,? ,?, ?
            );`,
            [ place.title, place.image, place.address, place.lat, place.lng ]
        );
    }

    public static editPlace = (id: string, place: PlacesModel): Promise<any> => {
        return PlacesDb.runQuery(
            ``
        );
    }

    public static deletePlace = (id: string): Promise<any> => {
        return PlacesDb.runQuery(
            ``
        );
    }

    public static listPlace = (): Promise<any> => {
        return PlacesDb.runQuery(
            `Select * from ${PlacesDb.tableName}`
        );
    }

    public static getPlace = (id: string): Promise<any> => {
        return PlacesDb.runQuery(
            `Select * from ${PlacesDb.tableName} WHERE id='${id}'`
        );
    }

    private static runQuery = (query: string, args: (string | number)[] = []): Promise<any> => {
        if (PlacesDb.debug) {
            console.log({ query, args });
        }
        return new Promise((res, rej) => {
            PlacesDb.db.transaction((tx) => {
                tx.executeSql(query, args, (_, result) => res(result), (_, err) => {
                    rej(err);
                    return false;
                });
            });
        });
    }
}