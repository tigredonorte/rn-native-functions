import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';

import { FormItemType, FormState, InputType } from '../model/FormFieldModel';
import { checkValidity, initField } from '../model/FormItemFunctions';
import { FormErrorComponent } from './ErrorComponent';
import { ImagePickerComponent } from './ImagePicker.component';
import { LocationPickerComponent } from './LocationPicker.component';

interface FormItemInput {
    formItem: FormItemType;
    isEditing: boolean;
    updateFormItem: (value: FormItemType) => void;
}

export const FormItem = (props: FormItemInput) => {
    
    const [ field, setField ] = useState<{value: any, validityState: FormState, touched: boolean}>({
        ...initField(props.formItem),
        touched: false
    });
    const updateForm = useDebouncedCallback((value: any) => {
        if (!field.touched) {
            return;
        }
        props.updateFormItem({ 
            ...props.formItem, 
            valid: field.validityState.valid,
            value
        });
    }, 400);

    const setTouched = () => {
        if (!field.touched) {
            setField((field) => ({ ...field, touched: true }));
            updateForm(field.value);
        }
    }

    const onChangeText = (value: any) => {
        const validityState = checkValidity(props.formItem.validationFn, value);
        setField(field => ({ ...field, value, validityState }));
        updateForm(value);
    };

    const extraParams = { ...InputType[props.formItem.formType], ...props.formItem?.extraParams };
    
    switch (props.formItem.formType) {
        case 'imagePicker':
            return <View style={Styles.formItem}>
                <ImagePickerComponent onImageTaken={(img) => {
                    setField({ touched: true, validityState: { valid: true, errorMessage: '' }, value: img });
                    updateForm(img);
                }} />
            </View>;
    
        case 'locationPicker' :
            return <View style={Styles.formItem}>
                <LocationPickerComponent onLocationTaken={(location) => {
                    setField({ touched: true, validityState: { valid: true, errorMessage: '' }, value: location });
                    updateForm(location);
                }} />
            </View>;
    }


    return (
        (!props.isEditing || (props.isEditing && props.formItem.editable))
            ? <>
                <View style={Styles.formItem}>
                    <TextInput
                        value={field.value}
                        placeholder={props.formItem.title}
                        label={props.formItem.label || props.formItem.title}
                        error={field.touched&&!field.validityState.valid}
                        {...extraParams}
                        onChangeText={onChangeText}
                        onEndEditing={setTouched}
                    />
                    {
                        field.touched && !field.validityState.valid && 
                        <FormErrorComponent errorMessage={field.validityState.errorMessage} />
                    }
                </View>
            </>
        : <></>
    );
}

const Styles = StyleSheet.create({
    formItem: {
        marginVertical: 10
    },
});
