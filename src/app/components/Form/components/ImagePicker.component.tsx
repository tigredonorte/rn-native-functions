import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';

interface ImagePickerInput {
    onImageTaken: (imgUri: string) => void;
    onClearImage: () => void;
} 

export const ImagePickerComponent: React.FC<ImagePickerInput> = (props) => {

    const [ image, setImage ] = useState<string>();

    const requestPermission = async() => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if ( status !== 'granted') {
            throw new Error('You need to grant camera permission to use this app')
        }

        const data = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if ( data.status !== 'granted') {
            throw new Error('You need to grant media library permission to use this app')
        }
    }

    const getImage = async() => {
        return await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [ 16, 9 ],
            quality: 0.8
        });
    }

    const takeImage = useCallback(async() => {
        try {
            props.onClearImage();
            await requestPermission();
            const img = await getImage();
            if (img.cancelled === true) {
                return;
            }
            setImage(img.uri);
            props.onImageTaken(img.uri);
        } catch (error: any) {
            Alert.alert('Could not get the image', error, [{ text: 'ok' }]);
        }
    }, []);

    return (
        <Card style={!image ? Styles.imagePreview : Styles.imagePreview2 } onPress={takeImage}> 
            {
                image 
                    ? <Card.Cover style={Styles.image} source={{ uri: image }}/>
                    : <Card.Content style={Styles.buttonContainer}>
                          <Button onPress={takeImage} icon="camera"> Take Image </Button>
                      </Card.Content>
            }
        </Card>
    );
};

const Styles = StyleSheet.create({
    imagePreview: {
        flex: 1
    },
    imagePreview2: {
        flex: 1,
        height: 200
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
