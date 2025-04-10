import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, Image, ScrollView, Platform, KeyboardAvoidingView, Modal } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { navStrings, RootStackParamList } from '../../../navigation/navStrings';
import axios from 'axios';
import Config from 'react-native-config';
import getAxiosClient from '../../../HttpService/AxiosClient';
import { Services } from '../../../HttpService';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { Icons } from '../../../assets/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import ChooseRoleScreen from '../welcome/ChooseRoleScreen';
import StyledDropdown from '../../../components/Dropdown/StyledDropdown';
import { Formik, FormikHandlers, FormikProps } from 'formik';

const { height, width } = Dimensions.get('window');
const initialValue ={
  email:'',
  password:'',
  name:'',
  role:Services.ROLE.PATIENT,
  document:''
}
type Props = {
  navigation: NavigationProp<RootStackParamList, 'SIGNUP'>

}
const SignupScreen = (props: Props) => {
  const [roleChooser, setRoleChooser] = useState(true)
   const formikRef = React.useRef<FormikProps<typeof initialValue>>(null);
  const handleSignup = async (values:typeof initialValue) => {
    console.log('Username:', values.name, Config.BASE_URL);
    console.log('Email:', values.email);
    console.log('Password:', values.password);

    try {
      const client = await getAxiosClient();
      const deviceToken = await AsyncStorage.getItem('fcmToken');
      const response = await client.post(Services.REGISTER, {
        ...values,
        deviceToken: deviceToken ?? '',
        plateform: Platform.OS
      });
      if (response.data.token) {
        try {
          console.log(response.data)
          await Keychain.setGenericPassword(values.email, JSON.stringify(response.data));
        } catch (error) {
          console.log(error, 'error in setting token');
        }
        if (response.data.firstLogin) {
          props.navigation.navigate('UserProfileForm');
        } else
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'BOTTOMTAB' }],
          });
      }
      console.log(response, 'Registration response');
    } catch (error: any) {
      console.log('Registration error:', error);
      if (error?.response?.status == 400) {
        Alert.alert("Error", error.response.data.message)
      }
    }
  };

 const handleProffesion = ()=>{
    formikRef.current?.setFieldValue("role","doctor");
    setRoleChooser(false)
  }

  return (
    // <View style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <Modal statusBarTranslucent visible={roleChooser} style={{ flex: 1 }}>
        <ChooseRoleScreen onProfessionalSelect={handleProffesion} done={() => setRoleChooser(false)} />
      </Modal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="always" keyboardDismissMode='on-drag' automaticallyAdjustKeyboardInsets contentContainerStyle={{ paddingTop: 120 }}>
        <Image source={Icons.appLogo} style={{ width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center', marginVertical: 10 }} />

        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Please sign up to continue</Text>
        <Formik
          innerRef={formikRef}
          initialValues={initialValue}
          // validationSchema={validationSchema}
          onSubmit={handleSignup}>
          {({
            values,
            handleChange,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <>
                {/* Username Input */}
                <CustomInput
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder='Your name'
                  leftIcon={
                    <Image source={Icons.userIcon} style={styles.iconStyle} />
                  }
                  error={touched.name && errors.name}
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
                  error={touched.email && errors.email}
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                <CustomInput
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  extra={
                    {
                      keyboardType: "visible-password",
                      inputMode: "text"
                    }
                  }
                  isPassword
                  error={touched.password && errors.password}
                  leftIcon={
                    <Image source={Icons.lockIcon} style={styles.iconStyle} />
                  }
                />
                {values.role !== Services.ROLE.PATIENT && <StyledDropdown
                  data={[
                    { label: "Doctor", value: "doctor" },
                    { label: "Nurse", value: "nurse" }
                  ]}
                  placeholder="Selecr Profession"
                  value={values.role}
                  onChangeText={handleChange('role')}
                  error={touched.role && errors.role}
                  style={{marginBottom:16}}
                />}
                <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </>
            )
          }}
            </Formik>
        <TouchableOpacity onPress={() => props.navigation.navigate("LOGIN")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    // </View>
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
