import { Location } from 'react-native-get-location';
import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import {Country} from '../interfaces/Country';
import {Establishment} from '../interfaces/Establlishment';
import {ErrorData, ResponseData} from '../interfaces/Response';
import {Image as ImageType} from 'react-native-image-crop-picker';

export const addEstablishmentImage = async (
  userId: number,
  position: number,
  image: ImageType,
  location: Location
) => {
  try {
    const axiosClient = await getAxiosClient();
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('position', position);
    formData.append('isMain', position === 1? "True":"False");
    formData.append('latitude', location.latitude);
    formData.append('longitude', location.longitude);

    console.log("location.latitude",location);
    
    var filename = image.path.replace(/^.*[\\/]/, '')

    // return;
    formData.append('image', {
      ...image,

      name: filename,
      uri: image.path,
      type: 'image/jpeg',
    });

    const data = await axiosClient.post(
      Services.ESTABLISHMENT_IMAGES,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data.data as ResponseData<Country[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
export const getEstablishmentImages = async (userId: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.ESTABLISHMENT_IMAGES, {
      params: {
        id: userId,
      },
    });
    return data.data as ResponseData<Establishment[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
