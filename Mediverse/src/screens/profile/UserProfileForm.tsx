import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VectorIcons, {IconSets} from '../../components/Icons/VectorIcons';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/navStrings';
import ProfilePicUploader from './components/ProfilePicUploader';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import CustomInput from '../../components/CustomInput/CustomInput';
import StyledDropdown from '../../components/Dropdown/StyledDropdown';
import PhoneInput from './components/PhoneInput';
import PromiseButton from '../../components/CustomButton/PromiseButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import getAxiosClient from '../../HttpService/AxiosClient';
import {Services} from '../../HttpService';
import { callProfileUpdateApi, fetchProfile, profileValidation } from './ProfileFunctions';

type Props = {
  navigation: NavigationProp<RootStackParamList, 'UserProfileForm'>;
};
const initialValues = {
  name: '',
  age: '',
  bloodGroup: '',
  phone: '',
  profilePic: {uri: '', type: '', name: ''},
  gender: '',
  email: '',
  dob: '',
};
const UserProfileForm = (props: Props) => {
  const formikRef = React.useRef<FormikProps<typeof initialValues>>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const handleBackPress = () => {
    props.navigation.goBack();
  };
  const updateProfile = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
      console.log('Form values:', values);
      const formData = new FormData();
  
      Object.keys(values).forEach((key) => {
        if (key === 'profilePic' && values.profilePic?.uri) {
          formData.append('profilePic', {
            uri: values.profilePic.uri,
            type: values.profilePic.type || 'image/jpeg',
            name: values.profilePic.name || 'profile.jpg',
          });
        } else if (values[key as keyof typeof initialValues] !== undefined) {
          formData.append(key, String(values[key as keyof typeof initialValues]));
        }
      });
      await callProfileUpdateApi(formData,props.navigation)
    } catch (error:any) {
      console.log('Error:', error?.response?.data || error.message);
    }
  };
  
  const handleVerify = () => {};
  const handleOtpSubmit = (otp: string) => {
    console.log('OTP submitted:', otp);
    if (otp != '1234' || otp.length < 4) {
      setVerificationError('Invalid OTP');
      return;
    }
    setVerificationError(null);
    setIsVerified(true);
  };

  const handleResend = () => {
    setResendLoading(true);
    if (formikRef.current?.values)
      console.log('🔁 Resending OTP to', formikRef.current.values.phone);
    setTimeout(() => {
      setResendLoading(false);
      Alert.alert(
        'OTP Resent',
        `OTP has been resent to ${formikRef?.current?.values.phone}`,
      );
    }, 1500);
  };

  async function getProfileData() {
    try {
      const data = await fetchProfile();
      formikRef.current?.setFieldValue("name",data.profile.name);
      formikRef.current?.setFieldValue("email",data.profile.email);
      console.log(data,"user data:::")
    } catch (error) {
      
    }
  }


  useEffect(()=>{
    getProfileData();
  },[])
  return (
    <View style={styles.flex}>
      <SafeAreaView>
        <View style={styles.container}>
          <VectorIcons
            name="arrow-back"
            size={24}
            color="#000"
            iconSet={IconSets.Ionicons}
          />
          <TouchableOpacity
            onPress={handleBackPress}
            hitSlop={{
              top: 30,
              bottom: 30,
              left: 30,
              right: 30,
            }}></TouchableOpacity>
          <Text style={styles.profileText}>Profile</Text>
        </View>
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}
          automaticallyAdjustKeyboardInsets
          keyboardShouldPersistTaps="handled"
          style={styles.scrollContainer}>
          <Formik
            initialValues={initialValues}
            innerRef={formikRef}
            validationSchema={profileValidation}
            onSubmit={updateProfile}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isSubmitting,
              touched,
              setFieldValue
            }) => (
              <>
                <ProfilePicUploader
                  onSelect={(e)=>setFieldValue('profilePic',e)}
                  image={values.profilePic.uri}
                />
                <CustomInput
                  placeholder="Full Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  error={touched.name && errors.name}
                  containerStyle={styles.fieldMargin}
                  leftIcon={
                    <VectorIcons
                      name="person"
                      size={20}
                      color="#9CA3AF"
                      iconSet={IconSets.MaterialIcons}
                    />
                  }
                />
                <PhoneInput
                  value={values.phone}
                  onChange={handleChange('phone')}
                  onVerify={handleVerify}
                  onResend={handleResend}
                  error={touched.phone && errors.phone}
                  verificationError={verificationError}
                  resendError={resendError}
                  resendLoading={resendLoading}
                  isVerified={isVerified}
                  onSubmitOtp={handleOtpSubmit}
                />
                <CustomInput
                  placeholder="Age"
                  value={values.age}
                  onChangeText={handleChange('age')}
                  error={touched.age && errors.age}
                  extra={{
                    keyboardType: 'numeric',
                    inputMode: 'numeric',
                  }}
                  leftIcon={
                    <VectorIcons
                      name="cake"
                      size={20}
                      color="#9CA3AF"
                      iconSet={IconSets.MaterialIcons}
                    />
                  }
                  containerStyle={styles.fieldMargin}
                />
                <StyledDropdown
                  data={[
                    {label: 'A+', value: 'A+'},
                    {label: 'B+', value: 'B+'},
                    {label: 'O+', value: 'O+'},
                    {label: 'AB+', value: 'AB+'},
                  ]}
                  placeholder="Blood Group"
                  value={values.bloodGroup}
                  onChangeText={handleChange('bloodGroup')}
                  error={touched.bloodGroup && errors.bloodGroup}
                  style={styles.fieldMargin}
                />
                <StyledDropdown
                  data={[
                    {label: 'Male', value: 'male'},
                    {label: 'Female', value: 'female'},
                    {label: 'Other', value: 'other'},
                  ]}
                  placeholder="Gender"
                  value={values.gender}
                  onChangeText={handleChange('gender')}
                  style={styles.fieldMargin}
                  error={touched.gender && errors.gender}
                />
                <CustomInput
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={touched.email && errors.email}
                  extra={{
                    keyboardType: 'email-address',
                    inputMode: 'email',
                    editable:false
                  }}
                  leftIcon={
                    <VectorIcons
                      name="email"
                      size={20}
                      color="#9CA3AF"
                      iconSet={IconSets.MaterialCommunityIcons}
                    />
                  }
                  containerStyle={styles.fieldMargin}
                />
                <Pressable onPress={() => setShowDatePicker(true)}>
                  <CustomInput
                    placeholder="Date of Birth"
                    value={values.dob}
                    onChangeText={handleChange('dob')}
                    error={touched.dob && errors.dob}
                    extra={{
                      keyboardType: 'numeric',
                      inputMode: 'numeric',
                      editable: false,
                    }}
                    leftIcon={
                      <VectorIcons
                        name="calendar"
                        size={20}
                        color="#9CA3AF"
                        iconSet={IconSets.MaterialCommunityIcons}
                      />
                    }
                    containerStyle={styles.fieldMargin}
                  />
                </Pressable>
                <PromiseButton
                  onPress={handleSubmit}
                  text="Login"
                  loading={isSubmitting}
                  style={styles.fieldMargin}
                />
              </>
            )}
          </Formik>
        </ScrollView>
        {showDatePicker && (
          <RNDateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="date"
            is24Hour={true}
            // minimumDate={new Date()}
            maximumDate={
              new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            }
            onTouchCancel={() => setShowDatePicker(false)}
            onTouchEnd={() => setShowDatePicker(false)}
            themeVariant="light"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || new Date();
              setShowDatePicker(false);
              formikRef.current?.setFieldValue(
                'dob',
                currentDate.toLocaleDateString(),
              );
            }}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserProfileForm;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginEnd: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-bold',
  },
  flex: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
    marginTop: 24,
  },
  fieldMargin: {
    marginTop: 20,
  },
});
