import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const CLIENT_ID = '337b91f66e0ea80';

const uploadToImgur = async (base64Image) => {
    try {
        const response = await axios.post(
            "https://api.imgur.com/3/image", // Imgur upload endpoint
            {
                image: base64Image, // Base64 image data
                type: "base64", // Let Imgur know it's a base64 image
            },
            {
                headers: {
                    Authorization: `Client-ID ${CLIENT_ID}`, // Pass Client-ID in headers
                },
            }
        );

        // Extract the URL of the uploaded image
        const imageUrl = await response.data.data.link;

        // Alert.alert("Upload Successful!", `Image URL: ${imageUrl}`);
        console.log("Uploaded Image URL:", imageUrl);
        return imageUrl;
    } catch (error) {
        console.error("Error uploading to Imgur:", error.response ? error.response.data : error.message);
        // Alert.alert("Error", "Failed to upload image to Imgur.");
    }
};

async function captureImage()
{
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if(status !== 'granted')
    {
        Alert.alert('Permission Denied', 'Permission to access camera is required');
        return Promise.reject('Permission not granted');
    }

    let result = await ImagePicker.launchCameraAsync(
        {
            mediaTypes: ImagePicker.Image,
            quality: 1,
            allowsEditing: true,
            aspect: [1, 1],
            base64: true,
        }
    );

    if(!result.canceled)
    {
        //console.log(result.assets);
        let imageBase64 = result.assets[0].base64;
        let imageURL = await uploadToImgur(imageBase64);
        console.log(imageURL);
        return Promise.resolve(imageURL);
    }
    else {
        return Promise.reject('Image not captured');
    }
}

export default captureImage; //returns image url