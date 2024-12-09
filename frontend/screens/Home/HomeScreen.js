import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

function HomeScreen({ navigation }) {
    let [fonts] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    function handleRegisteration() {
        navigation.navigate('RegistrationScreen');
    }
    return (
        <>
            <View style={styles.container} onLayout={onLayoutRootView}>
                <View style={styles.header}>
                    <Image source={require('../../assets/nadra_logo.png')} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.headerText}>NADRA e-portal</Text>
                </View>
                <View style={styles.button}>
                    <Button title="Register new Citizen" onPress={handleRegisteration} />
                </View>
            </View>
        </>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: '50',
        backgroundColor: 'aliceblue'
    },

    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10
    },

    logo: {
        flex: 1,
        height: 90
    },

    headerText: {
        flex: 2,
        fontWeight: 'bold',
        fontSize: 25.0,
        fontFamily: 'Poppins_700Bold'
    },

    button: {
        flex: 7,
        justifyContent: 'center'
    }
})