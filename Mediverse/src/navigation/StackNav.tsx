import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Splash, Login, Welcome } from '../screens';
import SignupScreen from '../screens/auth/register/SignupScreen';
import BottomNav from './patient/BottomNav';
import ChangePasswordScreen from '../screens/auth/register/ChangePasswordScreen';
import ForgetPassword from '../screens/auth/register/ForgetPassword';
import UserProfileForm from '../screens/profile/UserProfileForm';
import ChooseRoleScreen from '../screens/auth/welcome/ChooseRoleScreen';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator  initialRouteName='SPLASH'  screenOptions={{ headerShown: false, animation: 'default' }}>
      <Stack.Screen name="SPLASH" options={{ navigationBarColor: '#000', navigationBarTranslucent: true, navigationBarHidden: true }} component={Splash} />
      {/* <Stack.Screen name="ChooseRoleScreen" options={{ statusBarStyle: "dark",navigationBarColor:"rgba(94,197,174,0.5)"}} component={ChooseRoleScreen} /> */}
      <Stack.Screen name="LOGIN" component={Login} options={{ navigationBarColor: '#f8f8f8', statusBarStyle: "dark", statusBarBackgroundColor: "#f8f8f8" }} />
      <Stack.Screen name="SIGNUP" component={SignupScreen} options={{ navigationBarColor: '#f8f8f8', statusBarStyle: "dark", statusBarBackgroundColor: "#f8f8f8" }} />
      <Stack.Screen name='WELCOME' component={Welcome} options={{ navigationBarColor: '#f8f8f8', navigationBarTranslucent: true, statusBarTranslucent:true }} />
      <Stack.Screen name="BOTTOMTAB" component={BottomNav} options={{statusBarBackgroundColor:"#fff", navigationBarColor: '#f8f8f8', navigationBarTranslucent: true,statusBarStyle:"dark"}} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ navigationBarColor: '#f8f8f8', navigationBarTranslucent: true }} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ navigationBarColor: '#f8f8f8', navigationBarTranslucent: true }} />
      <Stack.Screen name="UserProfileForm" component={UserProfileForm} options={{ navigationBarColor: '#f8f8f8', navigationBarTranslucent: true,statusBarStyle:"dark",statusBarBackgroundColor:"transparent" }} />
      <Stack.Screen name="DoctorTab" component={BottomNav} options={{ navigationBarColor: '#f8f8f8', navigationBarTranslucent: true, statusBarTranslucent:true }} />
    </Stack.Navigator>
  );
};

export default StackNav;
