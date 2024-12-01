import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash/SplashScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import RegistrationScreen from '../screens/Registration/RegistrationScreen';

const Stack = createNativeStackNavigator();

function Navigations()
{
    console.log("Navigation");
    return(
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='RegistrationScreen'>
                    {/* <Stack.Screen name='SplashScreen' component={SplashScreen} />
                    <Stack.Screen name='HomeScreen' component={HomeScreen} /> */}
                    <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default Navigations;