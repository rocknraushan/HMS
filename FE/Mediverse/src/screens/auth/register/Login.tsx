import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/navStrings';
import getAxiosClient from '../../../HttpService/AxiosClient';
import { Services } from '../../../HttpService';
import Storage from '../../../storage/Storage'
import CustomInput from '../../../components/CustomInput/CustomInput';
import { Icons } from '../../../assets/icons';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup'
import * as Keychain from 'react-native-keychain';

const { height, width } = Dimensions.get('window');
const initialVal = {
  email: '',
  password: ""
}
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Email required"),
  password: Yup.string().required("Password is required").min(5, "Password must be of 6 characters")
})
type Props = {
  navigation: NavigationProp<RootStackParamList, 'LOGIN'>
}

const LoginScreen = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (values: typeof initialVal, helpers: FormikHelpers<{
    email: string;
    password: string;
  }>) => {
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const client = await getAxiosClient();
      const response = await client.post(Services.LOGIN, {
        email: values.email,
        password: values.password
      });
      console.log(response.data, 'Registration response');
      if (response.data) {
        try {
          await Keychain.setGenericPassword("token", response.data.token);

        } catch (error) {
          console.log(error, "error in setting token")
        }
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'BOTTOMTAB' }]
        })
      }
    } catch (error: any) {
      console.error('Registration error:', error.response.data);
      if (error.response.data)
        helpers.setErrors(error.response.data)
    }
  };

  const onForgetPress = () => {
    props.navigation.navigate("ForgetPassword")
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode='on-drag' automaticallyAdjustKeyboardInsets contentContainerStyle={{ paddingTop: 120 }}>
        <Image source={Icons.appLogo} style={{ width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center', marginVertical: 10 }} />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Hope you are doing fine</Text>
        <Formik
          initialValues={initialVal}
          validationSchema={validationSchema}
          onSubmit={handleLogin}>
          {({
            values,
            handleChange,
            errors,
            touched,
            handleSubmit
          }) => {
            return (
              <>
                {/* Email Input */}
                <CustomInput
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
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
                />

                {/* Password Input */}
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

                {/* Login Button */}
                <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </>
            )
          }}
        </Formik>
        {/*or*/}
        <View style={styles.orWrapper}>
          <Text style={styles.orText}>Or</Text>
        </View>
        {/* Signup Link */}
        <TouchableOpacity onPress={() => props.navigation.navigate("SIGNUP")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>

        {/* Forgot Password Link */}
        <TouchableOpacity onPress={onForgetPress}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  orText: {
    position: 'absolute',
    color: "#6B7280",
    backgroundColor: "#F9FAFB",
    padding: 5,
    alignSelf: "center",
    textAlign: 'center',
    verticalAlign: "middle",
  },
  orWrapper: {
    width: '100%',
    height: 2,
    backgroundColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10
  },
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginEnd: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB',
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
  forgotPassword: {
    color: '#4CAF50',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen;
