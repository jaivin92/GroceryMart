import { View, Text ,Platform } from 'react-native';
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Splash from './src/Screens/Splash';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import OnBoarding from './src/Screens/OnBoarding';
import OnBoarding2 from './src/Screens/OnBoarding';
import Home from './src/Screens/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  SystemNavigationBar.navigationHide();

  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName='Splash'
      screenOptions={{headerShown :false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="OnBoarding2" component={OnBoarding2} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App