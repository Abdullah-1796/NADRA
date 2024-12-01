import React from "react";
import { Text } from "react-native";

function SplashScreen({navigation})
{
    React.useEffect(() => {
        setTimeout(() => {
            navigation.replace('HomeScreen');
        }, 5000);
    }, []);

    return(
        <>
            <Text>Splash Screen</Text>
        </>
    );
}

export default SplashScreen;