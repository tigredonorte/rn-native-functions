import React, { FunctionComponent, useReducer } from 'react';
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
    valid: boolean,
    touched: boolean,
    items: {[s: string]: FormItemBasic}
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
const getInitialFormStatus = (form: FormParameters) => {
    const items: {[s: string]: FormItemBasic} = {};
    for (const formItem of form) {
        items[formItem.key] = {
            value: formItem.value,
            valid: checkValidity(formItem.validationFn, formItem.value)?.valid
        }
    }
    return {
        items,
        touched: false,
        valid: formIsValid(items)
    };
}

const formReduceFn = (state: FormState, action: {type: string; payload: any }) => {
    if (action.type === 'update') {
        const items = { 
            ...state.items,
            [action.payload.key]: {
                value: action.payload.value,
                valid: action.payload.valid
            }
        };
        return ({
            items: { ...items },
            touched: true,
            valid: formIsValid(items)
        });
    }
    return state;
};

interface FormContainerInput {
    isEditing: boolean;
    formParameters: FormParameters;
    onSave: (data: { [s: string]: any }) => void;
    isSaving: boolean;
    buttonText?: string;
}

export const FormContainerComponent: FunctionComponent<FormContainerInput> = (props) => {

    const [ formState, formDispatch ] = useReducer<ReducerFn<FormState, FormItemType>, FormState>(
        formReduceFn, 
        getInitialFormStatus(props.formParameters),
        () => getInitialFormStatus(props.formParameters)
    );

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

    if (props.isSaving) {
        return (<FetchStateLoading />);
    }

    return (
        <ScrollView contentContainerStyle={Styles.container}>
            {
                props.formParameters.map((formItem) => (
                    <FormItem
                        key={formItem.key}
                        isEditing={props.isEditing}
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
