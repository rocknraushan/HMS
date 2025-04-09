import { Services } from "../../HttpService";
import getAxiosClient from "../../HttpService/AxiosClient";
import * as Yup from 'yup'

export const profileValidation = Yup.object().shape({
    dob:Yup.string().required("Please enter Date of birth"),
    phone:Yup.string().required("Mobile no required").min(10,"Please add a valid Phone")
})

export const fetchProfile = async () => {
    try {
        const client = await getAxiosClient();
        const response = await  client.get(Services.PROFILE);
        return response.data;
    } catch (error) {
        console.error('Error fetching API data:', error);
        throw error;
    }
};

export const callProfileUpdateApi = async (formData: FormData,navigation:any) => {
     
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