import React, { useEffect, useState } from 'react';
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
import VectorIcons, { IconSets } from '../../components/Icons/VectorIcons';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navStrings';
import ProfilePicUploader from './components/ProfilePicUploader';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import CustomInput from '../../components/CustomInput/CustomInput';
import StyledDropdown from '../../components/Dropdown/StyledDropdown';
import PhoneInput from './components/PhoneInput';
import PromiseButton from '../../components/CustomButton/PromiseButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import getAxiosClient from '../../HttpService/AxiosClient';
import { Services } from '../../HttpService';
import { callProfileUpdateApi, fetchProfile, profileValidation } from './ProfileFunctions';
import SuccessModal from '../../components/loaders/SuccessModal';
import PatientForm from './components/PatientForm';
import DoctorForm from './components/DoctorForm';
import { bufferToImageUrl, BufferType } from '../../utils/commonFunction';
import CustomDatePicker from '../../components/customDatePicker/CustomDatePicker';

type Props = {
  navigation: NavigationProp<RootStackParamList, 'UserProfileForm'>;
};

const UserProfileForm = (props: Props) => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [profiledata, setProfileData] = useState<any>(null)
  const handleBackPress = () => {
    props.navigation.goBack();
  };


  async function getProfileData() {
    try {
      const data = await fetchProfile();
      if (data.profile) {
        const { profile } = data
        console.log(profile, "data prof")
        setProfileData(profile)
      }
    } catch (error) {

    }
  }



  useEffect(() => {
    getProfileData();
  }, [])
  return (
    <View style={styles.flex}>
      <SuccessModal title='Congratulations!' subTitle='Your account is ready to use. You will be redirected to the Home Page in a few seconds...' duration={5000} visible={showSuccess} onClose={() => setShowSuccess(false)} />
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
        style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          automaticallyAdjustKeyboardInsets
          keyboardShouldPersistTaps="handled"
          style={styles.scrollContainer}>
          {
            profiledata && profiledata.role === "patient" && (
              <PatientForm data={profiledata} navigation={props.navigation} />
            )
          }
          {profiledata && profiledata.role === "doctor" && (<DoctorForm data={profiledata} navigation={props.navigation} />)}
        </ScrollView>
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
