import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Input from "./components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import captureImage from "../../modules/captureImage";
import detectFace from "../../modules/detectFace";
import axios from "axios";
import { ImageBackground } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

function RegistrationScreen() {
    const hostedURL = "https://6930-154-80-5-243.ngrok-free.app";
    const [data, setData] = React.useState({
        fName: "",
        lName: "",
        age: "",
        dob: "",
        gender: "",
        address: "",
        cnic: "",
        url: "https://i.imgur.com/aeyellR.jpeg"
    });

    const [date, setDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [gender, setGender] = React.useState({
        male: false,
        female: false,
        others: false,
    });
    const [imageCaptured, setImageCaptured] = React.useState(false);

    function handleChange(name, value) {
        setData(prev => {
            console.log(name + ': ' + value);
            return ({
                ...prev,
                [name]: value
            });
        });
    }

    function handleGenderChange(value) {
        setGender({
            male: value === 'male',
            female: value === 'female',
            others: value === 'others'
        });
    }

    async function handleCapture() {
        const imageURL = await captureImage();
        const result = await detectFace(imageURL);
        if (result !== 'Unable to detectFace') {
            setImageCaptured(true);
            handleChange('url', imageURL);
            console.log(result);
        }
    }

    function handleRegistration() {
        axios.post('' + hostedURL + '/users', data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error('Unable to register new user', err);
            });
    }


    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-GB').format(date);
    };

    //console.log("Registration");
    return (
        <>
            <KeyboardAwareScrollView
                extraScrollHeight={0}
                enableOnAndroid={true}
                contentContainerStyle={styles.scrollContainer}
            >
                <ImageBackground
                    source={require('../../assets/B3.jpg')}
                    style={styles.background}
                    resizeMode="cover"
                >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Image source={require('../../assets/nadra_logo.png')} style={styles.logo} resizeMode="contain" />
                            <Text style={styles.headerText}>NADRA e-portal</Text>
                        </View>

                        <View style={styles.form}>
                            <View style={styles.heading}>
                                <Text style={{ fontSize: 18.0, fontWeight: '500' }}>Register new Citizen</Text>
                            </View>
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
                                isDate={true}
                                setOpen={setOpen}
                            />
                            {
                                open && <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    maximumDate={maxDate}
                                    onChange={(e, d) => {
                                        setDate(d);
                                        //console.log(formatDate(d));
                                        handleChange('dob', formatDate(d));
                                        setOpen(false);
                                    }}
                                />
                            }
                            <View style={styles.checkboxInput}>
                                <Text style={styles.label}>Select Gender</Text>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        value={gender.male}
                                        onValueChange={() => {
                                            handleGenderChange('male');
                                            handleChange('gender', 'male');
                                        }}
                                    />
                                    <Text style={{ marginLeft: 10, fontSize: 13.0 }}>Male</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        value={gender.female}
                                        onValueChange={() => {
                                            handleGenderChange('female');
                                            handleChange('gender', 'female');
                                        }}
                                    />
                                    <Text style={{ marginLeft: 10, fontSize: 13.0 }}>Female</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        value={gender.others}
                                        onValueChange={() => {
                                            handleGenderChange('others');
                                            handleChange('gender', 'others');
                                        }}
                                    />
                                    <Text style={{ marginLeft: 10, fontSize: 13.0 }}>Others</Text>
                                </View>
                            </View>
                            <View style={styles.checkboxInput}>
                                <Text style={styles.captureButton} onPress={handleCapture}>Capture Face</Text>
                                <Text>{data.url}</Text>
                            </View>
                            {/* <Text style={styles.registerButton} onPress={handleRegistration}>Register</Text> */}
                            <LinearGradient style={styles.registerButton} colors={['#061b52', '#52679d']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} onTouchStart={handleRegistration}>
                                <Text style={styles.buttonText}>Register</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAwareScrollView>
        </>
    );
}

export default RegistrationScreen;


const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: 'white',
    },

    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 70,
        paddingBottom: 20
    },

    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10
    },

    logo: {
        flex: 1,
        height: 90
    },

    headerText: {
        flex: 2,
        fontWeight: 'bold',
        fontSize: 25.0,
        fontFamily: 'Poppins_400Regular',
    },

    heading: {
        flex: 1,
        justifyContent: 'center',
        fontSize: '15.0',
        width: '100%',
        paddingVertical: '25',
        marginLeft: 10
    },

    form: {
        // backgroundColor: 'blue',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: 15
    },

    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        marginVertical: '5',
        paddingLeft: 10
    },

    checkboxInput: {
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

    captureButton: {
        flex: 1,
        textAlign: 'center',
        padding: '10',
        borderRadius: 30.0,
        backgroundColor: '#f3f4f5',
        elevation: 1.0
    },

    registerButton: {
        flex: 1,
        padding: '20',
        width: '99%',
        borderRadius: 30.0,
        backgroundColor: '#25316D',
        elevation: 5.0
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
