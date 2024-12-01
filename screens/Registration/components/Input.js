import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function Input(props) {
    const name = props.name;
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.label}>{props.label}</Text>
                <TextInput
                    placeholder={props.placeholder}
                    keyboardType={props.keyboardType}
                    value={props.value}
                    onChangeText={(value) => {
                        props.handleChange(name, value);
                    }}
                    style={styles.input}
                />
            </View>
        </>
    );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: '20',
        width: '98%',
    },
    label: {
        
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
    }
});