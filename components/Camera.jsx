import React from "react";
import * as ImagePicker from 'expo-image-picker';
import { Alert, Button, Image, StyleSheet } from "react-native";
import captureImage from "../modules/captureImage";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

function Camera() {
    const [imageURI, setImageURI] = React.useState(null);

    //---------------------------------------------------------------
    const apiKey = 'DDZtYMyekAeBJJxv5Xr4j95vgmDx0rdHAxnQMc70BDCtY405Gi5lJQQJ99AKACqBBLyXJ3w3AAAKACOGszoF';
    const endpoint = 'https://abdullah-1796.cognitiveservices.azure.com/face/v1.0/detect';

    async function detectFace(imageUri) {
        try {
            // Read the image as a base64 string
            const imageBinary = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // Convert the base64 string to a binary buffer
            const imageBuffer = Buffer.from(imageBinary, 'base64');

            // Send the image to Azure Face API
            const response = await axios.post(
                endpoint,
                imageBuffer,
                {
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'Ocp-Apim-Subscription-Key': apiKey, // Pass the correct API key
                    },
                    params: {
                        returnFaceId: true,
                        recognitionModel: 'recognition_04',
                    },
                }
            );

            if (response.data && response.data.length > 0) {
                const faceId = response.data[0].faceId;
                console.log('Face ID:', faceId);
                return faceId;
            } else {
                console.error('No face detected:', response.data);
                return null;
            }
        } catch (error) {
            console.error('Face detection error:', error);
        }
    }

    async function handleCapture() {
        try {
            const uri = await captureImage();
            setImageURI(uri);
    
            // Call detectFace after imageURI is updated
            
        } catch (error) {
            console.error('Error capturing image:', error);
        }
    }

    async function handleDetection(){
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