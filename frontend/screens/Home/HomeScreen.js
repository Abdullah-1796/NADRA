import React from "react";
import { Button } from "react-native";

function HomeScreen({navigation})
{
    function handleRegisteration()
    {
        navigation.replace('RegistrationScreen');
    }
    return(
        <>
            <Button title="Register new Citizen" onPress={handleRegisteration} />
        </>
    );
}

export default HomeScreen;