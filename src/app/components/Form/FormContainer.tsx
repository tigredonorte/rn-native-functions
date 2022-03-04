import React, { FunctionComponent, useEffect, useReducer, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { FetchStateLoading } from '../FetchStatus';

import { FormErrorComponent } from './components/ErrorComponent';
import { FormItem } from './components/FormItemComponent';
import { FormItemType } from './model/FormFieldModel';
import { checkValidity } from './model/FormItemFunctions';

export type FormParameters = FormItemType[];

interface FormItemBasic {
    value: any; 
    valid: boolean;
}

interface FormState { 
    valid: boolean;
    touched: boolean;
    initialized: boolean;
    items: {[s: string]: FormItemBasic};
}

type ReducerFn<T, M> = (state: T, action: {type: string; payload: M }) => T;

const formIsValid = (items: {[s: string]: FormItemBasic} ) => {
    for(const i in items) {
        if (!items[i].valid) {
            return false;
        }
    }
    return true;
}
const getInitialFormStatus = (form: FormParameters): FormState => {
    const items: {[s: string]: FormItemBasic} = {};
    for (const formItem of form) {
        items[formItem.key] = {
            value: formItem.value,
            valid: checkValidity(formItem.validationFn, formItem.value)?.valid
        }
    }
    return {
        items,
        initialized: true,
        touched: false,
        valid: formIsValid(items)
    };
}

const formReduceFn = (state: FormState, action: {type: string; payload: any }): FormState => {
    if (action.type === 'update') {
        const items = { 
            ...state.items,
            [action.payload.key]: {
                value: action.payload.value,
                valid: action.payload.valid
            }
        };
        return ({
            initialized: true,
            items: { ...items },
            touched: true,
            valid: formIsValid(items)
        });
    }
    return state;
};

const initialState: FormState = {
    items: {},
    touched: false,
    valid: false,
    initialized: false
};

interface FormContainerInput {
    isEditing?: boolean;
    formParameters: FormParameters;
    onSave: (data: { [s: string]: any }) => void;
    isSaving: boolean;
    buttonText?: string;
}

export const FormContainerComponent: FunctionComponent<FormContainerInput> = (props) => {

    const { formParameters } = props;
    const [ state, setState ] = useState<FormState>(initialState);
    const [ formState, formDispatch ] = useReducer<ReducerFn<FormState, FormItemType>, FormState>(
        formReduceFn, state, () => state
    );

    useEffect(() => {
        setState(getInitialFormStatus(formParameters));
    }, [ formParameters ]);

    const save = () => {
        if (!formState.valid) {
            return;
        }
        const out: { [s: string]: any } = {};
        for (const key in formState.items) {
            const formItem = formState.items[key];
            out[key] = formItem.value;
        }
        props.onSave(out);
    }

    const updateFormItem = (payload: FormItemType) => formDispatch({ type: 'update', payload });

    return (
        <ScrollView contentContainerStyle={Styles.container}>
            {
                props.formParameters.map((formItem) => (
                    <FormItem
                        disabled={props.isSaving}
                        key={formItem.key}
                        isEditing={props.isEditing || false}
                        formItem={formItem}
                        updateFormItem={updateFormItem}
                    />
                ))
            }
            {
                props.buttonText && <Button 
                    onPress={save}
                    labelStyle={Styles.button}
                    mode={!formState.valid||!formState.touched? 'outlined' : 'contained' }
                    disabled={!formState.valid||!formState.touched}
                    icon={`content-save${props.isEditing ? '-edit' : ''}-outline`}
                > { props.buttonText } </Button>
            }
            { 
                !formState.valid && formState.touched &&
                <View style={Styles.errorContainer}>
                    <FormErrorComponent errorMessage='You have errors on your form'/> 
                </View>
            }
            {
                props.isEditing && (!formState.valid && !formState.touched) &&
                <View style={Styles.errorContainer}>
                    <FormErrorComponent errorMessage='Edit something'/> 
                </View>
            }
        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        marginHorizontal: 10
    },
    button: { 
        fontSize: 24 
    },
    errorContainer: { 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
});
