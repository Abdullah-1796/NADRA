import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import RegistrationScreen from './screens/Registration/RegistrationScreen';
import Navigations from './navigation/Navigations';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/Splash/SplashScreen';
import HomeScreen from './screens/Home/HomeScreen';

const Stack = createNativeStackNavigator();
export default function App() {

	return (
		<>
			<StatusBar style="auto" />
			<Navigations />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '40',
		padding: '0'
	},
});
