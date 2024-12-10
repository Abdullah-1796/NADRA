import React from "react";
import { Button, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { BlurView } from "expo-blur";
import { LinearGradient } from 'expo-linear-gradient';

function HomeScreen({ navigation }) {
    let [fonts] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold
    });

    const onLayoutRootView = React.useCallback(async () => {
        if (fonts) {
            await SplashScreen.hideAsync();
        }
    }, [fonts]);

    if (!fonts) {
        return null;
    }

    function handleRegisteration() {
        navigation.navigate('RegistrationScreen');
    }
    return (
        <>
            <ImageBackground
                source={require('../../assets/B1.png')}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.container} onLayout={onLayoutRootView}>
                    <View style={styles.header}>
                        <Image source={require('../../assets/nadra_logo.png')} style={styles.logo} resizeMode="contain" />
                        <Text style={styles.headerText}>NADRA e-portal</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <BlurView style={styles.blur} intensity={30}>
                            <Text style={styles.t1}>Welcome to the NADRA e-portal</Text>
                            <Text style={styles.t2}>Empowering you to serve with efficiency and accuracy. Explore tools and resources to streamline citizen registration and data management</Text>
                        </BlurView>
                    </View>
                    <View style={styles.buttonContainer}>
                        <LinearGradient style={styles.button} colors={['#061b52', '#52679d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} onTouchStart={handleRegisteration}>
                            <Text style={styles.buttonText}>Register New Citizen</Text>
                            <Image source={require('../../assets/arrow_1.png')} style={styles.buttonImage} resizeMode="contain" />
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        </>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'brown'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: '50',
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
        fontFamily: 'Poppins_400Regular'
    },

    textContainer: {
        flex: 3,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginHorizontal: '15',
        backgroundColor: '#0000001e',
        overflow: 'hidden'
    },

    blurContainer: {
        flex: 1,
    },

    blur: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    t1: {
        fontSize: 14.0,
        fontWeight: 'bold',
    },

    t2: {
        fontSize: 13,
        textAlign: 'justify',
        marginTop: 25
    },

    buttonContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        borderRadius: 25,
        width: '94%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        padding: 25,
        borderRadius: 25,
        elevation: 10.0
        // backgroundColor: '#072544'
    },

    buttonText: {
        marginEnd: 10,
        fontWeight: '500',
        color: 'aliceblue'
    },

    buttonImage: {
        width: 50,
        height: 25,
    }
})