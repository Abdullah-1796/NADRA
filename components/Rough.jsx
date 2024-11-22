import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { Alert, Button, Image, StyleSheet } from "react-native";
import captureImage from "../modules/captureImage";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

function Camera() {
    const [imageURI, setImageURI] = React.useState(null);
    const [imageBase64, setImageBase64] = React.useState(null);

    //---------------------------------------------------------------
    const detectFace = async () => {
        const apiKey = '8563cCZkrXVeku03Zcg4JDdxCn4CC_lN';
        const apiSecret = 'hIqpwBC_JEbjs_cUupmJPkogTkfUco5d';
        const url = 'https://api-us.faceplusplus.com/facepp/v3/detect';

        try {
            // Log Base64 Length
            console.log("Base64 Length:", imageBase64.length);

            // Clean Base64 (remove prefix if present)
            //const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

            // Check Length Again
            //console.log("Clean Base64 Length:", cleanBase64.length);

            // Prepare Form Data
            const formData = new URLSearchParams();
            formData.append('api_key', apiKey);
            formData.append('api_secret', apiSecret);
            formData.append('image_url', 'https://media.licdn.com/dms/image/v2/D4D03AQHCTihMuMHkLQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728624777703?e=1737590400&v=beta&t=8M87WBWAzdO1_ALbAVRa5lfHd4LIPeoFGmeJ5jKMX7I');
            formData.append('return_attributes', 'gender,age');

            // Send Request
            const response = await axios.post(url, formData.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            console.log('Face Detection Result:', response.data);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error("Response Error:", error.response.data);
            } else if (error.request) {
                console.error("Request Error:", error.request);
            } else {
                console.error("General Error:", error.message);
            }
            throw error;
        }
    };



    async function handleCapture() {
        try {
            const image = await captureImage();
            setImageURI(image.uri);
            setImageBase64(image.base64);
        } catch (error) {
            console.error('Error capturing image:', error);
        }
    }

    async function handleDetection() {
        if (!imageURI) {
            console.error('Image URI is null');
            return;
        }

        const faceId = await detectFace(imageURI);
        console.log('Face ID:', faceId);
    }

    return (
        <>
            <Button title="Capture Image" onPress={handleCapture} />
            <Button title="Detect Face" onPress={handleDetection} />
            {imageURI && <Image source={{ uri: imageURI }} style={styles.image} />}
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
