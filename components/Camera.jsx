import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { Alert, Button, Image, StyleSheet } from "react-native";

function Camera()
{
    const [image, setImage] = React.useState(null);

    async function captureImage() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if(status !== 'granted')
        {
            Alert.alert('Camera Permission Denied', 'Permission to access camera is required');
            return;
        }

        let result = await ImagePicker.launchCameraAsync(
            {
                mediaTypes: ImagePicker.Image,
                quality: 1,
                allowsEditing: true,
                aspect: [1, 1],
            }
        );

        if(!result.canceled)
        {
            console.log(result);
            setImage(result.assets[0].uri);
        }
        else {
            Alert.prompt('Image not captured');
        }
    }
    return (
        <>
            <Button title="Capture Image" onPress={captureImage} />
            {image && <Image source={{uri: image}} style={styles.image} />}
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        margin: 20,
        borderRadius: 25,
    }
});

export default Camera;