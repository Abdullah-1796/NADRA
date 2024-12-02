import React from "react";
import { StyleSheet, View, Text, TextInput, Keyboard } from "react-native";

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
                    onTouchEnd={()=>{
                        if(props.isDate)
                        {
                            Keyboard.dismiss();
                            props.setOpen(true);
                        }
                    }}
                />
            </View>
        </>
    );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0EBE3',
        borderRadius: 15,
        padding: '15',
        paddingVertical: 30,
        marginBottom: '15',
        width: '100%',
    },
    label: {
        fontSize: 10.0
    },
    input: {
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'white',
        margin: '3',
        height: '50',
        fontSize: 13.0
    }
});