import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Input from "./components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import captureImage from "../../modules/captureImage";
import detectFace from "../../modules/detectFace";
import axios from "axios";

function RegistrationScreen() {
    const hostedURL = "https://5dba-2400-adc5-12a-4400-5854-2d54-dd4d-b2ad.ngrok-free.app";
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
            //console.log(name + ': ' + value);
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

    async function handleCapture()
    {
        const imageURL = await captureImage();
        const result = await detectFace(imageURL);
        if(result !== 'Unable to detectFace')
        {
            setImageCaptured(true);
            handleChange('url', imageURL);
            console.log(result);
        }
    }

    function handleRegistration() {
        axios.post(''+hostedURL+'/users', data)
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
                extraScrollHeight={20}
                enableOnAndroid={true}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={{ fontSize: 18.0 }}>NADRA Registration Portal</Text>
                    </View>

                    <View style={styles.form}>
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
                    </View>
                    <View style={styles.checkboxInput}>
                        <Button
                        
                            title="Capture Face"
                            onPress={handleCapture}
                            style={styles.button}
                        />
                        <Text>{data.url}</Text>
                    </View>
                    <Button
                        title="Register"
                        onPress={handleRegistration}
                        style={styles.button}
                        color={'#8FACC0'}
                    />
                </View>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        padding: '15'
    },
    heading: {
        flex: 1,
        justifyContent: 'center',
        fontSize: '15.0',
        width: '100%',
        paddingVertical: '20'
    },
    form: {
        // backgroundColor: 'blue',
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        marginVertical: '5',
    },
    checkboxInput: {
        backgroundColor: '#D2E4F1',
        borderRadius: 15,
        padding: '15',
        paddingVertical: 30,
        marginBottom: '15',
        width: '100%',
    },
    label: {
        fontSize: 10.0
    },
    button: {
        flex: 1,
        width: '100%',
        borderRadius: '15'
    }
});
