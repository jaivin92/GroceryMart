import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { myColors } from '../Utils/MyColors'

const CmpButtonFullSize = ({ onPress, btnlable, isLoading, ...props }) => {


    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.fulllengthbtn, {...props}]}
            disabled={isLoading}
        >
            {isLoading ?
                <ActivityIndicator style={{ paddingVertical: 15, }} size="large" color={myColors.secondary} /> : 
                <Text style={styles.labelText}>{btnlable}</Text>
            }
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    fulllengthbtn: {
        backgroundColor: myColors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
    },
    labelText: {
        fontSize: 19,
        fontWeight: '500',
        color: myColors.secondary,
    }
})

export default CmpButtonFullSize