import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

function Navigations()
{
    return(
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='SplashScreen'>
                    <Stack.Screen name='SplashScreen' component={SplashScreen} />
                    <Stack.Screen name='HomeScreen' component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default Navigations;