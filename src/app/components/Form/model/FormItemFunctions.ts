import { FormItemType, FormState, ValidateFn } from "./FormFieldModel";

export const checkValidity = (validationFn: ValidateFn[], value: any): FormState => {
    try {
        if (!validationFn) {
            return {
                valid: true,
                errorMessage: undefined
            };
        }
        for (const i in validationFn) {
            const validation = validationFn[i](value);
            if (!validation.valid) {
                return validation;
            }
        }
    } catch (error) {
        console.warn(error);
    }
    return {
        valid: true,
        errorMessage: undefined
    };
};

export const initField = (formItem: FormItemType) => ({
    value: formItem.value,
    validityState: formItem.value !== '' 
        ? checkValidity(formItem.validationFn, formItem.value)
        : { errorMessage: undefined, valid: true }
})