import { Button, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import VectorIcons, { IconSets } from '../../../components/Icons/VectorIcons'
import StyledDropdown from '../../../components/Dropdown/StyledDropdown'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import DocumentPicker from 'react-native-document-picker';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomDatePicker from '../../../components/customDatePicker/CustomDatePicker'
import PromiseButton from '../../../components/CustomButton/PromiseButton'
import PhoneInput from './PhoneInput'
import ProfilePicUploader from './ProfilePicUploader'
import { callProfileUpdateApi, profileValidation } from '../ProfileFunctions'
import Toast from 'react-native-toast-message'
import { patientVal } from './ProfileVal'
import DocumentUploader from '../../../components/DocUploader/DocumentUploader'
import { PermissionsAndroid } from 'react-native'

type Props = {
  data: any;
  navigation: any;
}

const bloodGroups = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
];

const PatientForm: React.FC<Props> = ({ data, navigation }) => {
  const formikRef = React.useRef<FormikProps<any>>(null);

  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasStoragePermission, setHasStoragePermission] = useState(false);

  const handleDobChange = (selectedDate: any) => {
    const age = new Date().getFullYear() - new Date(selectedDate).getFullYear();
    formikRef.current?.setFieldValue('age', String(age));
  }

  const updateProfile = async (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => {
    try {
      console.log('Form values:', values);
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === 'profilePic' && 'uri' in values.profilePic && values.profilePic.uri) {
          formData.append('profilePic', {
            uri: 'uri' in values.profilePic ? values.profilePic.uri : '',
            type: values.profilePic.type || 'image/jpeg',
            name: 'name' in values.profilePic ? values.profilePic.name : 'profile.jpg',
          });
        } else if (values[key as typeof values] !== undefined) {
          formData.append(key, String(values[key as keyof typeof values]));
        }
      });

      await callProfileUpdateApi(formData, navigation)
    } catch (error: any) {
      console.log('Error:', error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    requestStoragePermission()
  }, [data]);


  const handleVerify = () => { };

  const handleOtpSubmit = (otp: string) => {
    console.log('OTP submitted:', otp);
    if (otp !== '1234' || otp.length < 4) {
      setVerificationError('Invalid OTP');
      return;
    }
    setVerificationError(null);
    setIsVerified(true);
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to select documents.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          }
        );
        setHasStoragePermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      setHasStoragePermission(true); // Android 13+ or iOS doesn't need this
      return true;
    }
  };
  

  const handleResend = () => {
    setResendLoading(true);
    if (formikRef.current?.values)
      console.log('🔁 Resending OTP to', formikRef.current.values.phone);
    setTimeout(() => {
      setResendLoading(false);
      Toast.show({
        type: 'success',
        text1: 'OTP Resent',
        text2: `OTP has been resent to ${formikRef?.current?.values.phone}`,
      });
    }, 1000);
  };

  return (
    <Formik
      initialValues={{
        ...patientVal,
        name: data?.name || '',
        email: data?.email || '',
        phone: data?.phone || '',
      }}
      innerRef={formikRef}
      validationSchema={profileValidation}
      enableReinitialize
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
            onSelect={(e) => setFieldValue('profilePic', e)}
            image={
              values.profilePic && 'data' in values.profilePic
                ? values.profilePic
                : values.profilePic?.uri || ''
            }
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
          <StyledDropdown
            data={bloodGroups}
            placeholder="Blood Group"
            value={values.bloodGroup}
            onChangeText={handleChange('bloodGroup')}
            error={touched.bloodGroup && errors.bloodGroup}
            style={styles.fieldMargin}
          />
          <StyledDropdown
            data={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' },
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
              editable: false,
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
          <CustomDatePicker
            handleChange={handleChange('dob')}
            onDateChange={handleDobChange}
            value={values.dob}
            error={touched.dob && errors.dob}
          />
          <CustomInput
            placeholder="Age"
            value={values.age}
            onChangeText={handleChange('age')}
            error={touched.age && errors.age}
            extra={{
              keyboardType: 'numeric',
              inputMode: 'numeric',
              editable: false,
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
          <CustomInput
            placeholder="Address"
            value={values.address}
            onChangeText={handleChange('address')}
            extra={{
              onBlur: handleBlur('address'),
              multiline: true,
            }}
            error={touched.address && errors.address}
            containerStyle={{ marginBottom: 12 }}
            leftIcon={
              <VectorIcons
                name="location-on"
                size={20}
                color="#9CA3AF"
                iconSet={IconSets.MaterialIcons}
              />
            }
          />

          <DocumentUploader
            value={values.documents}
            onChange={(docs: any[]) => setFieldValue('documents', docs)}
            hasPermission={hasStoragePermission}
          />

          <PromiseButton
            onPress={handleSubmit}
            text="Update Profile"
            loading={isSubmitting}
            style={styles.fieldMargin}
          />
        </>
      )}
    </Formik>
  )
}

export default memo(PatientForm)

const styles = StyleSheet.create({
  fieldMargin: {
    marginTop: 20,
  },
})
