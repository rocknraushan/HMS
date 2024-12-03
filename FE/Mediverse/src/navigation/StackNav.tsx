import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
// import {useSelector} from 'react-redux';
import {RootStackParamList} from './navStrings';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VectorIcons, {IconSets} from '../components/Icons/VectorIcons';
import {useUser} from '../context/user';
import {rspF, rspW} from '../theme/responsive';
import { Login } from '../screens';

const header = {headerShown: false};
const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNav = () => {
  //   const user_loggined = useSelector(state => state.auth.user_loggined);

  const {theme} = useUser();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        // animationEnabled: true,
        // ...TransitionPresets.SlideFromRightIOS,
        // cardOverlayEnabled: true,
        // presentation: 'modal',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#000',
          fontSize: Math.round(rspF(20)),
        },
        // headerLeft: () => {
        //   return (
        //     <TouchableOpacity
        //       style={{
        //         padding: 4,
        //       }}
        //       onPress={() => navigation.goBack()}>
        //       <VectorIcons
        //         name="arrow-back-ios"
        //         color={'#000'}
        //         size={rspW(24)}
        //         iconSet={IconSets.MaterialIcons}
        //       />
        //     </TouchableOpacity>
        //   );
        // },
      }}
    >
      <Stack.Screen
        name={'LOGIN'}
        component={Login}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
