import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!Geolocation) {
      reject(new Error('Geolocation is not available'));
      return;
    }
    if (Platform.OS === 'android') {
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
      if (Platform.Version >= 33) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'This app needs access to your location.',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
            }
        );
        
      }
    } else if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization?.();
        
    }

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      error => {
        reject(new Error(`Failed to get location: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};
