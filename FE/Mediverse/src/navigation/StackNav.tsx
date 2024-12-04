import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Splash, Login } from '../screens';
import SignupScreen from '../screens/auth/register/SignupScreen';
import BottomNav from './BottomNav';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const navigation = useNavigation();

  const handleSplashAnimationEnd = (screen: string) => {
    if (screen === 'LOGIN') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LOGIN' }],
      });
    } else if (screen === 'BOTTOMTAB') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'BOTTOMTAB' }],
      });
    }
  };
  

  return (
    <Stack.Navigator screenOptions={{ headerShown: false,animation:'default' }}>
      <Stack.Screen name="SPLASH" options={{navigationBarColor:'#fff',navigationBarTranslucent:true}}>
        {(props) => <Splash {...props} onAnimationEnd={handleSplashAnimationEnd} />}
      </Stack.Screen>
      <Stack.Screen name="LOGIN" component={Login} />
      <Stack.Screen name="SIGNUP" component={SignupScreen} />
      <Stack.Screen name="BOTTOMTAB" component={BottomNav} options={{navigationBarColor:'#fff',navigationBarTranslucent:true}} />
    </Stack.Navigator>
  );
};

export default StackNav;
