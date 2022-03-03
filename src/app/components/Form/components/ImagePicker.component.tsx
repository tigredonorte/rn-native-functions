import React, { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { theme } from '~app/styles/theme';
import * as ImagePicker from 'expo-image-picker';
import { useValue } from 'react-native-reanimated';

interface ImagePickerInput {
    onImageTaken: (imgUri: string) => void;
} 

export const ImagePickerComponent: React.FC<ImagePickerInput> = (props) => {

    const [ image, setImage ] = useState<string>();
    const takeImage = async() => {
        const img = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [ 16, 9 ],
            quality: 0.5
        });

        if (img.cancelled === true) {
            return;
        }
        setImage(img.uri);
        props.onImageTaken(img.uri);
    }

    return (
        <Card style={Styles.imagePreview} onPress={takeImage}> 
            {
                image 
                    ? <Card.Cover style={Styles.image} source={{ uri: image }}/>
                    : <Card.Content style={Styles.button}>
                          <Button onPress={takeImage} icon="camera"> Take Image </Button>
                      </Card.Content>
            }
        </Card>
    );
};

const Styles = StyleSheet.create({
    imagePreview: {
        flex: 1,
        height: 200,
        borderWidth: 1,
        borderColor: theme.colors.accent
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
