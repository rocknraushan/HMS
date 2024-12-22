import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Splash, Login, Welcome } from '../screens';
import SignupScreen from '../screens/auth/register/SignupScreen';
import BottomNav from './BottomNav';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const navigation = useNavigation();


  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'default' }}>
      <Stack.Screen name="SPLASH" options={{ navigationBarColor: '#000', navigationBarTranslucent: true, navigationBarHidden: true }}>
        {(props) => <Splash {...props} />}
      </Stack.Screen>
      <Stack.Screen name="LOGIN" component={Login} />
      <Stack.Screen name="SIGNUP" component={SignupScreen} />
      <Stack.Screen name='WELCOME' component={Welcome} options={{ navigationBarColor: '#fff', navigationBarTranslucent: true }} />
      <Stack.Screen name="BOTTOMTAB" component={BottomNav} options={{ navigationBarColor: '#fff', navigationBarTranslucent: true }} />
    </Stack.Navigator>
  );
};

export default StackNav;
