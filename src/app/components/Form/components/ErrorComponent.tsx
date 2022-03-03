import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '~app/styles/theme';

interface FormErrorInput {
    errorMessage?: string;
} 

export const FormErrorComponent: React.FunctionComponent<FormErrorInput> = (props: FormErrorInput) => {
    return (
        <Text style={Styles.errorText}>
            {props.errorMessage}
        </Text>
    );
};

const Styles = StyleSheet.create({
    errorText: {
        color: theme.colors.error,
        fontSize: 16
    }
});
