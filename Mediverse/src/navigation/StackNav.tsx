import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Splash, Login, Welcome, MyBookings } from '../screens';
import SignupScreen from '../screens/auth/register/SignupScreen';
import BottomNav from './patient/BottomNav';
import ChangePasswordScreen from '../screens/auth/register/ChangePasswordScreen';
import ForgetPassword from '../screens/auth/register/ForgetPassword';
import UserProfileForm from '../screens/profile/UserProfileForm';
import ChooseRoleScreen from '../screens/auth/welcome/ChooseRoleScreen';
import EvaidyaTermsScreen from '../screens/main/profile/EvaidyaTermsScreen';
import DoctorDetail from '../screens/main/Bookings/DoctorDetail';
import BookAppointmentScreen from '../screens/main/Bookings/Components/BookAppointmentScreen';
import DoctorProfileScreen from '../screens/DoctorProfile/DoctorProfileScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';

const Stack = createNativeStackNavigator();
const commonNavOption:NativeStackNavigationOptions = { navigationBarColor: '#f8f8f8', navigationBarTranslucent: true, statusBarTranslucent:false,statusBarBackgroundColor:"#fff" ,statusBarStyle:"dark"}
const StackNav = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator  
    initialRouteName='SPLASH'
      screenOptions={{ headerShown: false, animation: 'default' }}>
      <Stack.Screen name="SPLASH" options={{ navigationBarColor: '#000', navigationBarTranslucent: true, navigationBarHidden: true }} component={Splash} />
      <Stack.Screen 
        name="ChooseRoleScreen" 
        options={{ statusBarStyle: "dark", navigationBarColor: "rgba(94,197,174,0.5)" }} 
        component={ChooseRoleScreen as any} 
        initialParams={{ onProfessionalSelect: () => {}, done: false }} 
      />
      <Stack.Screen name="LOGIN" component={Login} options={{ navigationBarColor: '#f8f8f8', statusBarStyle: "dark", statusBarBackgroundColor: "#f8f8f8" }} />
      <Stack.Screen name="SIGNUP" component={SignupScreen} options={{ navigationBarColor: '#f8f8f8', statusBarStyle: "dark", statusBarBackgroundColor: "#f8f8f8" }} />
      <Stack.Screen name='WELCOME' component={Welcome} options={{ navigationBarColor: '#f8f8f8', navigationBarTranslucent: true, statusBarTranslucent:true }} />
      <Stack.Screen name="BOTTOMTAB" component={BottomNav} options={{statusBarBackgroundColor:"#fff", navigationBarColor: '#f8f8f8', navigationBarTranslucent: true,statusBarStyle:"dark"}} />
      
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ navigationBarColor: '#f8f8f8', navigationBarTranslucent: true }} />
      <Stack.Screen name="ChangePasswordScreen" 
      //@ts-ignore
      component={ChangePasswordScreen} initialParams={{email:"",otpRequred:true,token:""}} options={{ navigationBarColor: '#f8f8f8', navigationBarTranslucent: true,statusBarAnimation:"slide",animation:"flip",statusBarTranslucent:true, statusBarBackgroundColor:"#f8f8f8", statusBarStyle:"dark",headerShown:true, headerTitle:"Reset Password" }} />
      <Stack.Screen name="UserProfileForm" component={UserProfileForm} options={{...commonNavOption}}  />
      <Stack.Screen name="DoctorTab" component={BottomNav} options={{...commonNavOption}}  />
      <Stack.Screen name="TermsScreen" component={EvaidyaTermsScreen} options={{...commonNavOption}}  />
      <Stack.Screen name="DoctorDetail" component={DoctorDetail} options={{...commonNavOption}}  />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{...commonNavOption}}  />
      <Stack.Screen name="MyBookings" component={MyBookings} options={{...commonNavOption}}  />
      <Stack.Screen name="BookAppointmentScreen"
      //@ts-ignore
       component={BookAppointmentScreen} options={{ ...commonNavOption}} />
      <Stack.Screen
      //@ts-ignore
      component={DoctorProfileScreen} name='DoctorProfileScreen' options={{...commonNavOption}} />
      
    </Stack.Navigator>
  );
};

export default StackNav;
