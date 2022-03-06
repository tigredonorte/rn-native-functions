import { WebSQLDatabase } from 'expo-sqlite';
import { forEachObjIndexed, isNil } from 'ramda';

import { Validation } from './validation.class';
import { ValidationType } from './validation.model';

export class Db<T> {

    constructor(
        public debug = false, 
        private db: WebSQLDatabase,
        private tableName: string,
        private entity: ValidationType<T>,
    ) {}

    public validate = (
        item: {[Property in keyof T]: any}, 
        isEditing: boolean
    ) => forEachObjIndexed((field, key) => {
        const value = item[key];
        if (field.primary || (isEditing && !field.editable)) {
            return;
        }
        if (field.required && !isEditing && isNil(value)) {
            throw new Error(`Property ${key} is required!`);
        }
        Validation.validate(field, value, key as string);
    }, this.entity);
    

    // TODO write a real pagination function
    public paginate = () => {
        return this.runQuery(
            `Select * from ${this.tableName}`
        );
    }

    public deleteById = (id: string, field: string) => {
        return this.runQuery(
            `DELETE FROM ${this.tableName} where ${field}=?`,
            [ id ],
        );
    }

    public runQuery = (query: string, args: (string | number)[] = []): Promise<any> => {
        if (this.debug) {
            console.log({ query, args });
        }
        return new Promise((res, rej) => {
            this.db.transaction((tx) => {
                tx.executeSql(query, args, (_, result) => res(result), (_, err) => {
                    rej(err);
                    return false;
                });
            });
        });
    }
}