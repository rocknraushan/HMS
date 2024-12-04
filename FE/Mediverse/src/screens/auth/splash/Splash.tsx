import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { splash } from '../../../assets'; // Assuming splash image is in assets folder
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Splash = ({ onAnimationEnd }: { onAnimationEnd: () => void }) => {
  const scale = useSharedValue(0);

  // Perform login check in parallel with the animation
  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const value = await AsyncStorage.getItem('Login');
        const isLoggedIn = value !== null ? JSON.parse(value) : false;

        if (isLoggedIn) {
          onAnimationEnd('BOTTOMTAB'); // Navigate to BottomTab if logged in
        } else {
          onAnimationEnd('LOGIN'); // Navigate to Login if not logged in
        }
      } catch (error) {
        console.error('Error checking login state:', error);
        onAnimationEnd('LOGIN'); // Default to LOGIN if error occurs
      }
    };

    // Start the animation and wait 1400ms
    scale.value = withTiming(1, { duration: 1400 }, () => {
      // Ensure that the navigation happens after 1400ms
      runOnJS(checkLoginState)(); // Run the login check during the splash
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]}>
        <Image source={splash} style={styles.image} resizeMode="contain" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db', // Optional fallback color
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
});

export default Splash;
