import { Services } from "../../HttpService";
import getAxiosClient from "../../HttpService/AxiosClient";
import * as Yup from 'yup'
import StorageProvider from "../../storage/Storage";
import Toast from "react-native-toast-message";

export const profileValidation = Yup.object().shape({
  dob: Yup.string().required("Please enter Date of birth"),
  phone: Yup.string().required("Mobile no required").min(10, "Please add a valid Phone")
})

export const fetchProfile = async () => {
  try {
    const client = await getAxiosClient();
    const response = await client.get(Services.PROFILE);
    if (response.data.profile)
      await StorageProvider.setStorageItem("USER", response.data.profile);
    return response.data;
  } catch (error) {
    console.error('Error fetching API data:', error);
    throw error;
  }
};

export const callProfileUpdateApi = async (formData: FormData, navigation: any) => {

  try {
    const client = await getAxiosClient();
    const response = await client.put(Services.PROFILE_UPDATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    console.log('Response:', response);
    if (response.status === 200) {
      navigation.navigate('BOTTOMTAB');
    }
    console.log(response.data, 'Profile update response');
  } catch (error) {

  }
}

export const updateProfilePic = async (image: any) => {
  const client = await getAxiosClient();
  const formData = new FormData();
  formData.append('profilePic', {
    uri: image.uri,
    type: image.type || 'image/jpeg',
    name: image.name || 'profile.jpg',
  } as any);
  try {
    const client = await getAxiosClient();
    const response = await client.put(Services.PROFILE_PIC, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    console.log('Response:', response);
    if (response.status === 200) {
      Toast.show({
        type: 'success',
        text1: 'Profile updated successfully',
        position: 'top',
      });
    }
    console.log(response.data, 'Profile update response');
  } catch (error) {

  }
}