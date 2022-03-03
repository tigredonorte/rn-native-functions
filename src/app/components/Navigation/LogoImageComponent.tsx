import React, { FunctionComponent } from 'react';
import { Image, StyleSheet } from 'react-native';

interface LogoImageInput {}

export const LogoImage: FunctionComponent<LogoImageInput> = (props) => {
    return (
        <Image
            style={Styles.img}
            source={require('~assets/logo.png')}
        />
    );
}
const Styles = StyleSheet.create({
    img: {
        width: 50,
        height: 50
    },
});
