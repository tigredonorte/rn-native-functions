import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

export const InputType: { [s: string]: Partial<TextInputProps> } = {
    text: {},
    textArea: {
        multiline: true,
        numberOfLines: 8,
        autoCorrect: true,
    },
    decimal: {
        keyboardType: "decimal-pad"
    },
    email: {
        keyboardType: "email-address",
        autoCapitalize: 'none',
    },
    password: {
        secureTextEntry: true,
        autoCapitalize: 'none',
    },
    imagePicker: {}
};

export interface FormState {
    valid: boolean;
    errorMessage?: string;
}

export type ValidateFn = (value: any) => FormState;

export interface FormItemType {
    key: string;
    title: string;
    value?: any;
    label?: string;
    valid: boolean;
    editable: boolean;
    formType: keyof typeof InputType;
    extraParams?: Partial<TextInputProps>;
    validationFn: ValidateFn[];
}

export const creatFormBase = (options: Partial<FormItemType>) => ({ 
    valid: true, 
    editable: true,
    ...options
} as FormItemType);