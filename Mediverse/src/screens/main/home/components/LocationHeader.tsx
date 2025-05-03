import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { BellIcon, DownArrow, LocationIcon } from '../../../../assets/icons/svg/SvgIcons';
import Geolocation from '@react-native-community/geolocation';
import { rspH, rspW } from '../../../../theme/responsive';

const GOOGLE_API_KEY = 'AIzaSyBMznm-jJXo1zOwHyFkQz8WgwEKegN7BsQ';


const LocationNotificationHeader = () => {
  const [locationText, setLocationText] = useState('Searching...');
  const [loading, setLoading] = useState(true);

  const askPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location to show current city.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const fetchLocation = async () => {
    const hasPermission = await askPermission();
    if (!hasPermission) {
      setLocationText('Permission denied');
      setLoading(false);
      return;
    }


    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
          );
          const data = await res.json();
          const components = data?.results?.[0]?.address_components || [];

            const city = components.find((c: { types: string[]; long_name: string }) => c.types.includes('locality'))?.long_name;
          const country = components.find((c: { types: string[]; long_name: string }) => c.types.includes('country'))?.long_name;

          if (city || country) {
            setLocationText(`${city ?? 'Unknown'}, ${country ?? ''}`);
          } else {
            setLocationText('Location not found');
          }
        } catch (error) {
          console.log('Geocoding error:', error);
          setLocationText('Location error');
        }
        setLoading(false);
      },
      (error) => {
        console.log('Location error:', error);
        setLocationText('Location error');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      setLoading(true);
      await fetchLocation();
    };

    if (isMounted) {
      init();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: rspH(2) }}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity style={styles.locationRow}>
          <LocationIcon />
          {loading ? (
            <ActivityIndicator size="small" color="#111827" style={{ marginHorizontal: 6 }} />
          ) : (
            <Text style={styles.locationText}>{locationText}</Text>
          )}
          <DownArrow width={12} height={12} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.bellContainer}>
        <BellIcon />
        <View style={styles.redDot} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(LocationNotificationHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    // backgroundColor:'red'
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#111827',
    marginHorizontal: 6,
  },
  bellContainer: {
    position: 'relative',
  },
  redDot: {
    position: 'absolute',
    top: rspH(-1),
    right: rspW(2),
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
});
