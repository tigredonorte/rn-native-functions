import * as form from '~app/components/Form';

import { PlacesModel } from '../store/places';

export const getFormParameters = (place?: PlacesModel): form.FormParameters => [
    form.creatFormBase({
        key: 'title',
        title: "The place title",
        label: 'Title',
        value: place?.title,
        formType: 'text',
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
        title: "Image",
        label: 'Pic a good image!',
        value: place?.image || '',
        formType: 'imagePicker',
        validationFn: [
            form.ValidateRequired
        ],
    }),
    form.creatFormBase({
        key: 'address',
        title: "Address",
        label: 'Location address',
        value: place?.address,
        formType: 'locationPicker',
        validationFn: [
            form.ValidateRequired
        ],
        extraParams: {
            autoCapitalize: 'sentences',
            autoCorrect: true
        }
    }),
];