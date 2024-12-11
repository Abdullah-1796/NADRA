import React from "react";
import { StyleSheet, Image, View } from "react-native";

function SplashScreen({ navigation }) {
    React.useEffect(() => {
        setTimeout(() => {
            navigation.navigate('HomeScreen');
        }, 2000);
    }, []);

    return (
        <>
            <View style={styles.container}>
                <Image source={require('../../assets/nadra_logo.png')} style={styles.logo} resizeMode="contain" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo: {
        height: 150
    },
});


export default SplashScreen;