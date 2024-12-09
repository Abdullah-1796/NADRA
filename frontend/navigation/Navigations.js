import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash/SplashScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import RegistrationScreen from '../screens/Registration/RegistrationScreen';

const Stack = createNativeStackNavigator();

function Navigations()
{
    return(
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='HomeScreen'>
                    <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
                    <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}} />
                    <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} options={{headerShown: false}} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default Navigations;