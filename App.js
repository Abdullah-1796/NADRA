import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import RegistrationScreen from './screens/Registration/RegistrationScreen';
import Navigations from './navigation/Navigations';

export default function App() {

	return (
		<>
			<View style={styles.container}>
				<StatusBar style="auto" />
				<RegistrationScreen />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#a29393',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '40'
	},
});
