import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { CommonActions, NavigationProp, NavigationRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/navStrings';
import getAxiosClient from '../../../HttpService/AxiosClient';
import { Services } from '../../../HttpService';
import Storage from '../../../storage/Storage';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { Icons } from '../../../assets/icons';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import * as Keychain from 'react-native-keychain';
import GenericLoader from '../../../components/loaders/GenericLoader';
import PromiseButton from '../../../components/CustomButton/PromiseButton';
import { CallLoginApi, handleGoogleSignIn } from './AuthHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { values } from 'lodash';

const { height, width } = Dimensions.get('window');
const initialVal = {
  email: '',
  password: '',
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Enter a valid email').required('Email required'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be of 6 characters'),
});
type Props = {
  navigation: NavigationProp<RootStackParamList, 'LOGIN'>;
};

const LoginScreen = (props: Props) => {
  const formikRef = React.useRef<FormikProps<typeof initialVal>>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setLoading(true)
      const deviceToken = await AsyncStorage.getItem('fcmToken');
      const response = await CallLoginApi({
        email: formikRef.current?.values.email,
        password: formikRef.current?.values.password,
        loginType: 'email',
        plateform: Platform.OS,
        deviceToken,
      });

      console.log("response ===>", response)
      if (response) {
        setLoading(false)
        if (response.firstLogin) {
          props.navigation.navigate('UserProfileForm');
        } else
          props.navigation.reset({
            index: 0,
            routes: [{ name: "BOTTOMTAB" }]
          }
          )

      }
    } catch (error: any) {
      setLoading(false)
      console.error('Registration error:', error.response.data);
      if (error.response.data)
        formikRef.current?.setErrors(error.response.data);
    }
    finally {
      setLoading(false)

    }

  };
  async function handleSocialLogin() {
    const { idToken, accessToken, user } = await handleGoogleSignIn();
    console.log(idToken, accessToken, user, 'google response');
    if (user.id) {
      try {
        setLoading(true);
      const deviceToken = await AsyncStorage.getItem('fcmToken');
        const response = await CallLoginApi({
          email: user.email,
          password: '',
          loginType: 'google',
          plateform: Platform.OS,
          socialData: user,
          deviceToken
        });
        console.log(response, 'Registration response');
        if (response.token) {
          await Keychain.setGenericPassword(user.email, JSON.stringify(response));
          if (response.firstLogin) {
            props.navigation.navigate('UserProfileForm');
          } else
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'BOTTOMTAB' }],
            });
          // props.navigation.navigate('BOTTOMTAB');

        }
      } catch (error: any) {
        console.error('Registration error:', error.response.data);
        if (error.response.data)
          formikRef.current?.setErrors(error.response.data);
      }
      finally {
        setLoading(false)
      }
    }
  }

  const onForgetPress = () => {
    props.navigation.navigate('ForgetPassword');
  };

  return (
    <View style={styles.container}>
      {loading && <GenericLoader />}
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{ paddingTop: 120 }}>
        <Image
          source={Icons.appLogo}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: 10,
          }}
        />
        <Text
          style={{
            fontFamily: 'Poppins',
            fontSize: 20,
            color: '#999',
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          Medi<Text style={{ color: '#111928' }}>verse</Text>
        </Text>
        <Text style={styles.title}>Hi, Welcome Back</Text>
        <Text style={styles.subtitle}>Hope you are doing fine</Text>
        <Formik
          innerRef={formikRef}
          initialValues={initialVal}
          validationSchema={validationSchema}
          onSubmit={handleLogin}>
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
                {/* Email Input */}
                <CustomInput
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  extra={{
                    keyboardType: 'email-address',
                    inputMode: 'email',
                  }}
                  leftIcon={
                    <Image source={Icons.smsIcon} style={styles.iconStyle} />
                  }
                  error={touched.email && errors.email}
                />

                {/* Password Input */}
                <CustomInput
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  extra={{
                    keyboardType: 'visible-password',
                    inputMode: 'text',
                    onSubmitEditing(e) {
                      handleSubmit();
                    }}}
                  isPassword
                  error={touched.password && errors.password}
                  leftIcon={
                    <Image source={Icons.lockIcon} style={styles.iconStyle} />
                  }
                />

                {/* Login Button */}
                <PromiseButton
                  onPress={handleSubmit}
                  text="Login"
                  loading={isSubmitting}
                />
              </>
            );
          }}
        </Formik>
        {/*or*/}
        <View style={styles.orWrapper}>
          <Text style={styles.orText}>Or</Text>
        </View>
        <TouchableOpacity
          onPress={handleSocialLogin}
          style={styles.socialButton}>
          <Image source={Icons.googleIcon} style={styles.iconStyle} />
          <Text>Continue with Google</Text>
        </TouchableOpacity>
        {/* Signup Link */}
        <TouchableOpacity onPress={() => props.navigation.navigate('SIGNUP')}>
          <Text style={styles.link}>
            Don't have an account?{' '}
            <Text style={{ color: '#1C64F2' }}>Sign Up</Text>
          </Text>
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
    color: '#6B7280',
    backgroundColor: '#F9FAFB',
    padding: 5,
    alignSelf: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  orWrapper: {
    width: '100%',
    height: 2,
    backgroundColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
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
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#6B7280',
    textAlign: 'center',
    fontSize: 14,
  },
  forgotPassword: {
    color: '#1C64F2',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  socialButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export default LoginScreen;
