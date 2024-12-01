import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "./components/Input";

function RegistrationScreen() {
    const [data, setData] = React.useState({
        fName: "",
        lName: "",
        age: "",
        dob: "",
        gender: "",
        address: "",
        cnic: "",
    });

    function handleChange(name, value) {
        setData(prev => {
            console.log(name + ': ' + value);
            return ({
                ...prev,
                [name]: value
            });
        });
    }

    console.log("Registration");
    return (
        <>
            <View style={styles.container}>
                <View style = {styles.heading}>
                    <Text>NADRA Registration Portal</Text>
                </View>

                <View style = {styles.form}>
                    <Input
                        label='First Name'
                        name='fName'
                        placeholder='First Name'
                        value={data.fName}
                        keyboardType='default'
                        handleChange={handleChange}
                    />
                    <Input
                        label='Last Name'
                        name='lName'
                        placeholder='Last Name'
                        value={data.lName}
                        keyboardType='default'
                        handleChange={handleChange}
                    />
                    <Input
                        label='Age'
                        name='age'
                        placeholder='Age'
                        value={data.age}
                        keyboardType='numeric'
                        handleChange={handleChange}
                    />
                    <Input
                        label='Address'
                        name='address'
                        placeholder='Address'
                        value={data.address}
                        keyboardType='default'
                        handleChange={handleChange}
                    />
                    <Input
                        label='CNIC'
                        name='cnic'
                        placeholder='CNIC'
                        value={data.cnic}
                        keyboardType='numeric'
                        handleChange={handleChange}
                    />
                    <Input
                        label='Date of birth'
                        name='dob'
                        placeholder='dd/mm/yyyy'
                        value={data.dob}
                        keyboardType='default'
                        handleChange={handleChange}
                    />
                </View>
            </View>
        </>
    );
}

export default RegistrationScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b34545',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    heading: {
        flex: 1,
        justifyContent: 'center',
        fontSize: '20'
    },
    form: {
        flex: 5,
        // backgroundColor: 'blue',
        width: '100%',
        alignItems: 'center'
    }
});
