import React from 'react';
import { IconButton } from 'react-native-paper';
import { fontSizer } from '~app/styles/responsiveness';
import { theme } from '~app/styles/theme';

export interface HeaderButtonInput {
    style?: any;
    icon: string;
    onPress: () => void;
}

export const HeaderButton: React.FC<HeaderButtonInput> = (props: HeaderButtonInput) => {
    return (
        <IconButton
            icon={props.icon}
            style={props.style}
            color={theme.colors.white}
            size={fontSizer('icon')}
            onPress={props.onPress}
        />
     );
}