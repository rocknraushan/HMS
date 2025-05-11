import React, { useEffect } from 'react';
import { StyleSheet, Image, ImageBackground, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { splash, splashBG } from '../../../assets';
import { rspH, rspW } from '../../../theme/responsive';
import Keychain from 'react-native-keychain';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/navStrings';
import { Services } from '../../../HttpService';
import { fetchProfile } from '../../profile/ProfileFunctions';
interface Props {
  navigation: NavigationProp<RootStackParamList,"SPLASH">;
}
const Splash = ({ navigation }: Props) => {
  const scale = useSharedValue(0);



  const decodeJWT = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
  
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
  
      const decoded = Buffer.from(padded, 'base64').toString('utf8');
      return JSON.parse(decoded);
    } catch (err) {
      console.error('Failed to decode JWT:', err);
      return null;
    }
  };
  
  

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const user = await Keychain.getGenericPassword();
        const isLoggedIn = !!user;
    
        if (isLoggedIn) {
          const parsed = JSON.parse(user.password);
          const token = parsed.token;
    
          const payload = decodeJWT(token);
          if (!payload || !payload.role) {
            throw new Error('Invalid token payload or missing role');
          }
    
          console.log('Decoded Token Payload:', payload);
    
          switch (payload.role) {
            case Services.ROLE.DOCTOR:
              navigation.reset({
                index: 0,
                routes: [{ name: 'DoctorTab' }],
              });
              break;
            case Services.ROLE.PATIENT:
              navigation.reset({
                index: 0,
                routes: [{ name: 'BOTTOMTAB' }],
              });
              break;
            default:
              console.warn('Unknown role, redirecting to welcome');
              navigation.reset({
                index: 0,
                routes: [{ name: 'WELCOME' }],
              });
              break;
          }
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'WELCOME' }],
          });
        }
      } catch (error) {
        console.error('Error checking login state:', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'WELCOME' }],
        });
      }
    };
  
    scale.value = withTiming(1, { duration: 2000 }, () => {
      runOnJS(checkLoginState)();
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (<>
    <StatusBar hidden />
    <ImageBackground source={splashBG} style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]}>
        <Image source={splash} style={styles.image} resizeMode="contain" />
      </Animated.View>
    </ImageBackground>
  </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: rspW(150),
    height: rspH(150),
    borderRadius: 50,
    backgroundColor: 'transparent', // Optional fallback color
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '120%',
    height: '120%',
  },
});

export default Splash;
