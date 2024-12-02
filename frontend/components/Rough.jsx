import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { Alert, Button, Image, StyleSheet } from "react-native";
import captureImage from "../modules/captureImage";
import recognizeFace from "../modules/recognizeFace";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

function Camera() {
    const [imageURL, setImageURL] = React.useState(null);
    //const [imageBase64, setImageBase64] = React.useState(null);

    //---------------------------------------------------------------
    async function handleCapture() {
        try {
            const imageURL = await captureImage();
            setImageURL(imageURL);
            //setImageBase64(image.base64);
        } catch (error) {
            console.error('Error capturing image:', error);
        }
    }

    async function handleRecognition() {
        if (!imageURL) {
            console.error('Image URL is null');
            return;
        }
        try {
            const url1 = 'https://i.imgur.com/FxpBefb.jpeg';
            const url2 = imageURL;
            const result = await recognizeFace(url1, url2);

            if (result.match) {
                Alert.alert("Match Found", `Confidence: ${result.confidence}`);
            } else {
                Alert.alert("No Match", `Confidence: ${result.confidence}`);
            }
        } catch (error) {
            Alert.alert("Error", error.message || "Something went wrong.");
        }
    }

    return (
        <>
            <Button title="Capture Image" onPress={handleCapture} />
            <Button title="Recognize Face" onPress={handleRecognition} />
            {imageURL && <Image source={{ uri: imageURL }} style={styles.image} />}
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
