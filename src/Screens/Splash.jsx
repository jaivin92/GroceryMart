import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { myColors } from '../Utils/MyColors'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const nav = useNavigation()
    useEffect(() => {
        setTimeout(() => {
            nav.replace('OnBoarding')
        }, 5000);
    }, [])

    return (
        <View style={{ backgroundColor: myColors.primary, flex: 1, justifyContent: 'center' }}>
            <StatusBar style='light' />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                <Image style={{ tintColor: 'white', height: 100, width: 100 }} source={require('../assets/unnamed.png')} />
                <View>
                    <Text style={{ fontSize: 75, color: myColors.secondary }}>Jaivin</Text>
                    <Text style={{ fontSize: 17, color: myColors.secondary, textAlign: 'center', letterSpacing: 5, top: -15 }}>Online Groceries</Text>
                </View>
            </View>

        </View>
    )
}

export default Splash