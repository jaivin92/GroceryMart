import React from 'react'
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { myColors } from '../Utils/MyColors';
import { Text } from 'react-native';

const CmpHscreen = ({ item, viewableItems }) => {
    const rStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(
            viewableItems.value
                .filter((item) => item.isViewable)
                .find((viewableItem) => viewableItem.item.id === item.id)

        );
        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [
                {
                    scale: withTiming(isVisible ? 1 : 0.6),
                },
            ],
        };
    }, []);



    return (
        <Animated.View style={[{
            height: 80,
            width: '90%',
            backgroundColor: myColors.lightblue,
            marginBottom: 10,
            alignSelf: 'center',
            borderRadius: 15
        }, rStyle]} >
            <Text style={{
                alignSelf: 'flex-end',
                marginTop: 5,
                marginEnd: 10,
                fontSize: 15,
                color: myColors.secondary
            }} >{item.id}</Text>
        </Animated.View>
    )
}

export default CmpHscreen