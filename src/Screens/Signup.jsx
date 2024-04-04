import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { myColors } from '../Utils/MyColors'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'

const Signup = () => {
    const nav = useNavigation()
    const [isVisible, setisVisible] = useState(true);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.secondary }}>
            <StatusBar />
            <ScrollView style={{ flex: 1, paddingTop: 30 }}>
                <Image style={{ alignSelf: 'center', width: 100, height: 100 }}
                    source={require('../assets/unnamed.png')} />
                <View style={{ paddingHorizontal: 20, paddingTop: 50 }} >
                    <Text style={{ color: myColors.third, fontSize: 24, fontWeight: "500" }} >Sign Up</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 10 }} >Enter your credentials to continue</Text>
                    {/* username  */}
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }} >Username</Text>
                    <TextInput maxLength={9} keyboardType='name-phone-pad'
                        style={{ borderColor: "#E3E3E3", borderBottomWidth: 2, fontSize: 16, marginTop: 15 }} />

                    {/* Email  */}
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }} >Email</Text>
                    <TextInput keyboardType='email-address'
                        style={{ borderColor: "#E3E3E3", borderBottomWidth: 2, fontSize: 16, marginTop: 15 }} />

                    {/* Password  */}
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }} >Password</Text>
                    <View style={{ borderColor: "#E3E3E3", borderBottomWidth: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput maxLength={6} keyboardType='ascii-capable' secureTextEntry={isVisible}
                            style={{ fontSize: 16, marginTop: 15, flex: 0.8 }} />
                        <Ionicons onPress={() => setisVisible(!isVisible)} name={isVisible === true ? 'eye-off-outline' : 'eye-outline'} size={24} color='black' />
                    </View>


                    <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '400', color: 'black', marginTop: 15, letterSpacing: 0.7, lineHeight: 25, width: "95%" }}>
                        By continuing you agree to our terms of services and privacy policy
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            console.log("Press")
                        }}
                        style={{
                            backgroundColor: myColors.primary,
                            marginTop: 30,
                            height: 70,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ fontSize: 19, fontWeight: '500', color: myColors.secondary }} >Sign Up</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 20 }}>
                        <Text style={{ fontSize: 16, }} >Already have an account?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                nav.navigate("Login")
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15, color: myColors.primary, fontWeight: '600'
                                }}
                            >
                                Login Now
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup