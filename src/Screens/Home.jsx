import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useReducer, useRef } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Lottie from 'lottie-react-native'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'

import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated'
const AnimatedSvg = Animated.createAnimatedComponent(Svg)
import { myColors } from '../Utils/MyColors'
import MainScreen from './bottommenu/MainScreen'
import UploadScreen from './bottommenu/UploadScreen'
import ImageScreen from './bottommenu/ImageScreen'

const Home = () => {
  const Tab = createBottomTabNavigator()

  const screenOptions = {
    headerShadowVisible: true,
    headerStyle: {
      backgroundColor: myColors.primary,
    },
    headerTitleStyle:{
      color:myColors.secondary,
    },
    headerTitleAlign:'center'
  };



  return (
    <>
      <StatusBar barStyle="light-content" />

      <Tab.Navigator tabBar={props => <AnimatedTabBar {...props} />} 
        initialRouteName='Dashboard'  
      >
        <Tab.Screen name="Dashboard" options={{
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../assets/lottie/home.icon.json')} style={styles.icon} />,
          headerShadowVisible: true,
          headerStyle: {
            backgroundColor: myColors.primary,
          },
          headerTitleStyle:{
            color:myColors.secondary,
          },
          headerTitleAlign:'center'
        }}
          component={MainScreen}

        />

        <Tab.Screen name="Upload" options={{
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../assets/lottie/upload.icon.json')} style={styles.icon} />,
          ...screenOptions,
        }}
          component={UploadScreen}
        />

        <Tab.Screen name="Image" options={{
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../assets/lottie/chat.icon.json')} style={styles.icon} />,
          ...screenOptions,
        }}
          component={ImageScreen}
        />

        <Tab.Screen name="Settings" options={{
          tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('../assets/lottie/settings.icon.json')} style={styles.icon} />,
          ...screenOptions,
        }}
          component={PlaceholderScreen}
        />
        
      </Tab.Navigator>
    </>
  )
}

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors
}) => {
  const { bottom } = useSafeAreaInsets()
  const reducer = (state, action) => {
    return [...state, { x: action.x, index: action.index }]
  }

  const [layout, dispatch] = useReducer(reducer, [])

  const handleLayout = (event, index) => {
    dispatch({ x: event.nativeEvent.layout.x, index })
  }

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0
    return [...layout].find(({ index }) => index === activeIndex).x - 25
  }, [activeIndex, layout])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }]
    }
  })

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill={myColors.primary}
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex
          const { options } = descriptors[route.key]

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={e => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          )
        })}
      </View>
    </View>
  )
}

const TabBarComponent = ({ active, options, onLayout, onPress }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (active && ref?.current) {
      ref.current.play()
    }
  }, [active])


  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 })
        }
      ]
    }
  })

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
    }
  })

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}
      >
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  )
}


const PlaceholderScreen = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: myColors.secondary }} />
    </>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: myColors.primary,
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: myColors.secondary,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 36,
    width: 36,
  }
})

export default Home