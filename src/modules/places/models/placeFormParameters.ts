import * as form from '~app/components/Form';

import { PlacesModel } from '../store/places';

export const getFormParameters = (place?: PlacesModel): form.FormParameters => [
    form.creatFormBase({
        key: 'title',
        value: place?.title,
        formType: 'text',
        title: "The place title",
        label: 'Title',
        validationFn: [
            form.ValidateRequired,
            form.ValidateMinLength(2),
            form.ValidateMaxLength(20),
        ],
        extraParams: {
            autoCapitalize: 'sentences',
            autoCorrect: true
        }
    }),
    form.creatFormBase({
        key: 'image',
        value: place?.image || '',
        formType: 'url',
        title: "Image",
        validationFn: [
            form.ValidateRequired,
            form.ValidateUrl,
        ],
    }),
    form.creatFormBase({
        key: 'location',
        value: place?.location,
        formType: 'text',
        title: "Title",
        validationFn: [
            form.ValidateRequired,
            form.ValidateMinLength(2),
            form.ValidateMaxLength(20),
        ],
        extraParams: {
            autoCapitalize: 'sentences',
            autoCorrect: true
        }
    }),
    form.creatFormBase({
        key: 'description',
        value: place?.description || '',
        formType: 'textArea',
        title: "Description",
        extraParams: {
            autoCorrect: true
        },
        validationFn: [
            form.ValidateRequired,
            form.ValidateMinLength(40),
        ],
    }),
];