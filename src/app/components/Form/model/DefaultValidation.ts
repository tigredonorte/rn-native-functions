import { ValidateFn } from "./FormFieldModel";
import { isNil, isEmpty, toString } from 'ramda';

export const ValidateRequired: ValidateFn = (value: any) => {
    return {
        valid: !isNil(value) && !isEmpty(value) && toString(value).trim() !== '',
        errorMessage: 'this field is required!'
    };
};
export const ValidateMinLength = (length: number): ValidateFn => (value: any) => ({
    valid: value.length > length,
    errorMessage: `Type at least ${length + 1} characters`
});

export const ValidateMaxLength = (length: number): ValidateFn => (value: any) => ({
    valid: value.length <= length,
    errorMessage: `Enter a maximum of ${length} characters`
});


export const ValidateMinValue = (minValue: number): ValidateFn => (value: number) => ({
    valid: value > minValue,
    errorMessage: `Type a number greater than ${minValue}`
});


export const ValidateMaxValue = (maxValue: number): ValidateFn => (value: number) => ({
    valid: value <= maxValue,
    errorMessage: `Type a number lesser than ${maxValue}`
});

export const ValidateUrl: ValidateFn = (str: string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return {
        valid: !!pattern.test(str),
        errorMessage: `Invalid url!`
    };
}

export const ValidateEmail: ValidateFn = (email: string) => ({
    valid: (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)),
    errorMessage: `Invalid email address!`
})