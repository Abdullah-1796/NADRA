import React from "react";
import { View, Button, Platform, Alert } from "react-native";
import { launchCamera } from "react-native-image-picker";
import { PermissionsAndroid } from "react-native";

async function requestPermissions() {
    if (Platform.OS === "android") {
        // Request Camera and Storage permissions for Android
        const cameraGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Camera Permission",
                message: "This app needs access to your camera to take photos.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        const storageGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Storage Permission",
                message: "This app needs access to your storage to save photos.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        // Check if both permissions are granted
        return (
            cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
            storageGranted === PermissionsAndroid.RESULTS.GRANTED
        );
    }
    return true; // Assume permissions are set in Info.plist for iOS
}

async function TakeNewPhoto() {
    const hasPermission = await requestPermissions();

    if (hasPermission) {
        launchCamera({ mediaType: 'photo' }, (res) => {
            if (res.didCancel) {
                console.log("User cancelled camera");
            } else if (res.errorCode) {
                console.log("Camera Error: ", res.errorMessage);
            } else {
                console.log(res);
            }
        });
    } else {
        Alert.alert("Permissions denied", "You need to grant camera and storage permissions to use this feature.");
    }
}

function Camera() {
    return (
        <View>
            <Button onPress={TakeNewPhoto} title="Take Photo" accessibilityLabel="Take a new photo" />
        </View>
    );
}

export default Camera;
