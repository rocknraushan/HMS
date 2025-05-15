import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';
import { rspH, rspW } from '../../theme/responsive';

// Custom skeleton loader that doesn't rely on external libraries
const ProfileSkeletonLoader = () => {
  // Create animation value
  const pulseAnim = new Animated.Value(0);

  useEffect(() => {
    // Create pulse animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    );
    
    // Start animation
    pulse.start();
    
    // Clean up animation
    return () => pulse.stop();
  }, []);

  // Interpolate animation value to color
  const backgroundColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E1E9EE', '#F2F8FC']
  });

  // Create skeleton item component to reuse
  const SkeletonItem: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => (
    <Animated.View style={[styles.skeletonBase, style as any, { backgroundColor: backgroundColor as any }]} />
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <SkeletonItem style={styles.avatar} />
        
        {Array.from({ length: 7 }).map((_, index) => (
          <SkeletonItem key={index} style={styles.input} />
        ))}
        
        <SkeletonItem style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  skeletonBase: {
    borderRadius: 8,
  },
  avatar: {
    width: rspW(170),
    height: rspH(170),
    borderRadius: rspW(85),
    marginBottom: rspH(40),
  },
  input: {
    width: '100%',
    height: rspH(45),
    borderRadius: rspW(8),
    marginBottom: rspH(20),
  },
  button: {
    width: '60%',
    height: 45,
    borderRadius: 20,
    marginTop: 20,
  },
});

export default ProfileSkeletonLoader;