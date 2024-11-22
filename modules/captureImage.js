import * as ImagePicker from 'expo-image-picker';

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
        return Promise.resolve(result.assets[0]);
    }
    else {
        return Promise.reject('Image not captured');
    }
}

export default captureImage;