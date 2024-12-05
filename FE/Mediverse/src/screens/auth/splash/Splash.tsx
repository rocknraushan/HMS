import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, ImageBackground, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { splash, splashBG } from '../../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rspH, rspW } from '../../../theme/responsive';

const { width, height } = Dimensions.get('window');

const Splash = ({ onAnimationEnd }: { onAnimationEnd: (screen: string) => void;  }) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const value = await AsyncStorage.getItem('Login');
        const isLoggedIn = value !== null ? JSON.parse(value) : false;

        if (isLoggedIn) {
          onAnimationEnd('BOTTOMTAB');
        } else {
          onAnimationEnd('LOGIN');
        }
      } catch (error) {
        console.error('Error checking login state:', error);
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
