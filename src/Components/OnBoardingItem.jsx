import { StyleSheet, Text, View,  useWindowDimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { myColors } from '../Utils/MyColors';
import Lottie from 'lottie-react-native'

import { Animated, Easing } from 'react-native'
const AnimatedSvg = Animated.createAnimatedComponent(Lottie)


const OnBoardingItem = ({ item }) => {

    const { width } = useWindowDimensions();

    const animationProgres = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animationProgres.current, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

    }, [])

    return (
        <View style={[styles.container, { width }]}>
            <AnimatedSvg autoPlay loop source={item.image} style={[styles.image, { height: '50%', width }]} />
            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.normaltext}>{item.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',

    },
    image: {
        flex: 0.7,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    title: {
        fontWeight: '800',
        fontSize: 18,
        marginBottom: 10,
        color: myColors.third,
        textAlign: 'center'
    },
    normaltext: {
        fontWeight: '300',
        fontSize: 18,
        color: myColors.third,
        textAlign: 'center',
        paddingHorizontal: 20
    },
});

export default OnBoardingItem

