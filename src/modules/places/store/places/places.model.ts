import { ValidationType } from '~app/utils/db/validation.model';

export interface PlacesModel {
    id: string;
    title: string;
    address: string;
    image: string;
    lat: number;
    lng: number;
}

export const PlaceValidation: ValidationType<PlacesModel> = {
    id: {
        type: 'integer',
        primary: true,
        required: true,
        editable: false,
    },
    title: {
        type: 'text',
        required: true,
        editable: true,
    },
    address: {
        type: 'text',
        required: true,
        editable: true,
    },
    image: {
        type: 'text',
        required: true,
        editable: true,
    },
    lat: {
        type: 'real',
        required: true,
        editable: true,
    },
    lng: {
        type: 'real',
        required: true,
        editable: true,
    },
}