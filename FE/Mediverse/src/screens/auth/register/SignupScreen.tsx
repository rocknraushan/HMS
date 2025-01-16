import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, Image, ScrollView, Platform } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { navStrings, RootStackParamList } from '../../../navigation/navStrings';
import axios from 'axios';
import Config from 'react-native-config';
import getAxiosClient from '../../../HttpService/AxiosClient';
import { Services } from '../../../HttpService';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { Icons } from '../../../assets/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

type Props = {
  navigation: NavigationProp<RootStackParamList, 'SIGNUP'>

}
const SignupScreen = (props: Props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    console.log('Username:', username, Config.BASE_URL);
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const client = await getAxiosClient();
      const deviceToken = await AsyncStorage.getItem('fcmToken');
      const response = await client.post(Services.REGISTER, {
        email: email,
        password: password,
        role: Services.ROLE.PATIENT,
        name: username,
        deviceToken: deviceToken ?? '',
        plateform: Platform.OS
      });
      console.log(response, 'Registration response');
      Alert.alert('Success');
    } catch (error: any) {
      console.log('Registration error:', error);
      if (error?.response?.status == 400) {
        Alert.alert("Error", error.response.data.message)
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode='on-drag' automaticallyAdjustKeyboardInsets contentContainerStyle={{ paddingTop: 120 }}>
        <Image source={Icons.appLogo} style={{ width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center', marginVertical: 10 }} />

        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Please sign up to continue</Text>

        {/* Username Input */}
        <CustomInput
          value={username}
          onChangeText={setUsername}
          placeholder='Your name'
          leftIcon={
            <Image source={Icons.userIcon} style={styles.iconStyle} />
          }
          error=''
        />

        {/* Email Input */}
        <CustomInput
          extra={
            {
              keyboardType: "email-address",
              inputMode: "email"
            }
          }
          leftIcon={
            <Image source={Icons.smsIcon} style={styles.iconStyle} />
          }
          error=''
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          extra={
            {
              keyboardType: "visible-password",
              inputMode: "text"
            }
          }
          isPassword
          error=''
          leftIcon={
            <Image source={Icons.lockIcon} style={styles.iconStyle} />
          }
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("LOGIN")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginEnd: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1C2A3A',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#4CAF50',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default SignupScreen;
