import { StyleSheet } from 'react-native';
import { theme } from '~app/styles/theme';

export const Styles = StyleSheet.create({
    stateContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        fontSize: 20,
        marginBottom: 10,
        color: theme.colors.error
    },
    emptyText: {
        fontSize: 20,
        marginBottom: 10,
        color: theme.colors.primary
    }
});