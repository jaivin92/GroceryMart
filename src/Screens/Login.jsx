import { View, Text, ScrollView, Image, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { myColors } from '../Utils/MyColors'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import CmpInputText from '../Components/CmpInputText';
import CmpButtonFullSize from '../Components/CmpButton'

const LoginData = {
    email: '',
    password: ''
}

const Login = () => {
    const nav = useNavigation()
    const [isLoading, setisLoading] = useState(false);
    const [isCheck, setisCheck] = useState(false);
    const [userLogin, setuserLogin] = useState(LoginData);
    const [userLoginError, setuserLoginError] = useState(LoginData);
    const [isValidate, setIsValidate] = useState(false)

    const handleChange = (e, input) => {
        try {
            setuserLogin({ ...userLogin, [input]: e })
            if (isValidate) {
                validate()
            }
        } catch (error) {
            console.log(`Error ${error}`);
        }
    }

    const validate = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!reg.test(userLogin.email)) {
            LoginData.email = "Please Enter Email"
            setuserLoginError(LoginData)
            return false
        } else if (userLogin.password.length < 8) {
            LoginData.email = undefined
            LoginData.password = "Password should be at least 8 characters long"
            setuserLoginError(LoginData)
            return false
        } else {
            LoginData.password = undefined
            LoginData.email = undefined
            setuserLoginError(LoginData)
            return true
        }

    }

    const onLoginClick = () => {
        Keyboard.dismiss();
        setisLoading(true)
        setIsValidate(true);
        if (validate()) {
            nav.navigate("Home")
            setIsValidate(false);
        } else {
            setTimeout(() => {
                setisLoading(false)
            }, 2000);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.secondary }}>
            <StatusBar />
            <ScrollView style={{ flex: 1, paddingTop: 30 }}>
                <Image style={{ alignSelf: 'center', width: 100, height: 100 }}
                    source={require('../assets/unnamed.png')} />

                <View style={{ paddingHorizontal: 20, paddingTop: 50 }} >
                    <Text style={{ color: myColors.third, fontSize: 24, fontWeight: "500" }} >Login</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginVertical: 10 }} >Enter your credentials to continue</Text>

                    <CmpInputText
                        label="Email"
                        name="email"
                        onError={userLoginError.email}
                        handleTextChange={handleChange}
                        keyboardType='email-address'
                    />

                    <CmpInputText
                        label="Password"
                        name="password"
                        onError={userLoginError.password}
                        handleTextChange={handleChange}
                        password={true}
                        keyboardType='ascii-capable'
                    />


                    <View style={{ flexDirection: 'row', gap: 5, alignContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons onPress={() => setisCheck(!isCheck)} name={isCheck === true ? 'check-box-outline-blank' : 'check-box'} size={20} color='black' />
                        <Text numberOfLines={2} style={{
                            fontSize: 14, fontWeight: '400', color: 'black', marginTop: 10, letterSpacing: 0.7,
                            lineHeight: 25, width: "95%",
                        }}>
                            By continuing you agree to our terms of services and privacy policy
                        </Text>

                    </View>

                    <CmpButtonFullSize
                        onPress={onLoginClick}
                        btnlable={"Login"}
                        isLoading={isLoading}
                        marginTop={20}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                        <Text>Forgot Password ?</Text>
                        <Text>Sign Up</Text>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView >
    );
}

export default Login