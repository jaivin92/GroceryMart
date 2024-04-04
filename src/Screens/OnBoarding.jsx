

import React, { useState, useRef, useEffect } from 'react'
import { View,  StyleSheet, FlatList, useWindowDimensions, Image, Animated, Easing, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { myColors } from '../Utils/MyColors'
import { StatusBar } from 'expo-status-bar'
import OnBoardingItem from '../Components/OnBoardingItem'
import { slides } from '../../AppData'
import Svg, { G, Circle } from "react-native-svg";
import { useNavigation } from '@react-navigation/native'
import Lottie from 'lottie-react-native'

const AnimatedSvg = Animated.createAnimatedComponent(Lottie)

const OnBoarding2 = () => {
  const nav = useNavigation()
  const [page, setpage] = useState(0)
  const ref = useRef(null)
  const { width } = useWindowDimensions();

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    ref.current.scrollToIndex({ index: currentIndex })
    setpage(currentIndex);
  };

  const onscroll = () => {
    console.log(`current page onscroll ->  ${page}     ${slides.length - 1}`)
    if (page < slides.length - 1) {
      ref?.current.scrollToIndex({ index: page + 1 })
      setpage(page + 1);
      setpage(page + 1);
    } else {
      console.log("Last Item")
      nav.replace('Login');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <FlatList
        ref={ref}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        horizontal
        data={slides}
        renderItem={({ item }) => <OnBoardingItem item={item} />}
        onscroll={onscroll}
        keyExtractor={(item) => item.id}
        bounces={false}
      />

      <View style={{ marginBottom: 60, }}>

        <NextBtn scrollTo={onscroll} percentage={(page + 1) * (100 / slides.length)} currentpage={page} totalpage={slides.length} />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.secondary,
    backgroundColor: myColors.secondary,
  }
});


const NextBtn = ({ percentage, scrollTo, currentpage, totalpage }) => {
  const size = 70

  const strokewitdth = 2

  const center = size / 2

  const radius = size / 2 - strokewitdth / 2

  const circumference = 2 * Math.PI * radius

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animationProgres = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgres.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

  }, [])

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true
    }).start()
  }


  useEffect(() => {
    animation(percentage)
  }, [percentage])


  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100

      if (progressRef?.current) {
        progressRef.current.setNativeProps({ strokeDashoffset })
      }

    }, [percentage])

    return () => {
      progressAnimation.removeAllListeners()
    }

  }, [])


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: myColors.primary }}>
      <Svg width={size} height={size} fill={myColors.secondary}>
        <G rotation="-90" origin={center} >
          <Circle stroke='#FFFFFF' cx={center} cy={center} r={radius} strokeWidth={strokewitdth}
          />
          <Circle
            ref={progressRef}
            stroke="#1980E6"
            cx={center} cy={center} r={radius}
            strokeWidth={strokewitdth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity onPress={scrollTo} style={{ position: 'absolute' }} activeOpacity={0.6}>
        {currentpage === totalpage - 1 ? <AnimatedSvg autoPlay loop source={require('../assets/lottie/rightarrow.icon.json')}
          style={{ width: 50, height: 50, alignSelf: 'center' }} /> :
          <Image source={require('../assets/unnamed.png')}
            style={{
              resizeMode: 'contain',
              alignSelf: 'center',
              width: 50,
              height: 50,
            }}
          />
        }
      </TouchableOpacity>
    </View>
  )
}

export default OnBoarding2


