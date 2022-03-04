import { ValidationItem } from "./validation.model";

export class Validation {
    public static validate = (field: ValidationItem, value: any, key: string) => {
        switch (field.type) {
            case 'integer':
                if (!Number.isSafeInteger(value)) {
                    throw new Error(`${key} must be a integer`);
                }
                break;
            case 'real':
                if (Number.isNaN(value)) {
                    throw new Error(`${key} must be a number`);
                }
                break;
            case 'text':
                if (typeof value !== 'string') {
                    throw new Error(`${key} must be a string`);
                }
                break;
        }
    }
}