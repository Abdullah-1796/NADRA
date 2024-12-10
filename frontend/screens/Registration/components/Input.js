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
        backgroundColor: '#9aa9d1',
        borderRadius: 30,
        padding: '15',
        paddingVertical: 35,
        marginBottom: '20',
        width: '100%',
    },
    label: {
        fontSize: 10.0,
        marginBottom: 5,
        marginLeft: 10,
        fontWeight: '500'
    },
    input: {
        borderRadius: 15,
        paddingHorizontal: 20,
        backgroundColor: '#f3f4f5',
        margin: '3',
        height: '50',
        fontSize: 13.0
    }
});