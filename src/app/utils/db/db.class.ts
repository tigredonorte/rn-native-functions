import { WebSQLDatabase } from 'expo-sqlite';
import { forEachObjIndexed, isNil, mapObjIndexed, type } from 'ramda';

import { Validation } from './validation.class';
import { ValidationType } from './validation.model';

export class Db<T> {

    private primaryKey: string[] = [];
    private whereKey = '';
    constructor(
        public debug = false, 
        private db: WebSQLDatabase,
        private tableName: string,
        private entity: ValidationType<T>,
    ) {
        forEachObjIndexed((it, key) => {
            if (it.primary) {
                this.primaryKey.push(`${key}`);
            }
        }, entity);
        
        this.whereKey = this.primaryKey.map(value => `${value}=?`).join(' AND ');
    }

    public validate = (
        item: {[Property in keyof T]: any}, 
        isEditing: boolean
    ) => forEachObjIndexed((field, key) => {
        const value = item[key];
        if (field.primary) {
            return;
        }
        if (isEditing) {
            if (value === undefined) {
                return;
            } else if (!field.editable) {
                throw new Error(`You can't edit ${key}`);
            }
        }
        if (field.required && isNil(value)) {
            throw new Error(`Property ${key} is required!`);
        }
        Validation.validate(field, value, key as string);
    }, this.entity);

    public createTable = () => {
        const item: string[] = [];
        forEachObjIndexed((val, key) => {
            item.push(`${key} ${val.type} ${val.primary ? 'PRIMARY KEY': ''} ${val.required ? 'NOT NULL' : ''}`);
         }, this.entity);

        return this.runQuery(
            `CREATE TABLE IF NOT EXISTS ${this.tableName} (${item.join(', ')})`
        );
    }
    

    // TODO write a real pagination function
    public paginate = () => {
        return this.runQuery(
            `Select * from ${this.tableName}`
        );
    }

    public deleteById = (id: string | string[]) => {
        return this.runQuery(
            `DELETE FROM ${this.tableName} where ${this.whereKey}`,
            Array.isArray(id) ? id : [ id ],
        );
    }

    public add = (item: T): Promise<any> => {
        this.validate(item, false);
        const set: string[] = [];
        const fakeValues: string[] = [];
        const values: (string | number)[] = [];
        forEachObjIndexed((val, key) => {
           set.push(`${key}`);
           fakeValues.push(`?`);
           if (typeof val !== 'string' || typeof val !== 'number') {
               throw new Error(`Invalid value type for ${key}! Must be string or number!`);
           }
           values.push(val);
        }, item);

        return this.runQuery(
            `INSERT INTO ${this.tableName} (${set.join(',')}) VALUES (${fakeValues.join(',')});`,
            values
        );
    }

    public edit = (id: string | string[], item: { [Property in keyof T]: string | number }) => {
        if (!item) {
            throw new Error("Your editing object is empty!");
        }
        this.validate(item, true);
        const set: string[] = [];
        const values: (string | number)[] = [];
        forEachObjIndexed((val, key) => {
           set.push(`${key}=?`);
           values.push(val);
        }, item);
        if (!Array.isArray(id)) {
            id = [ id ];
        }
        id.map(it => values.push(it));

        return this.runQuery(
            `UPDATE ${this.tableName} set ${set.join(', ')} where ${this.whereKey}`,
            values,
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