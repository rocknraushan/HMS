import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const Skeleton = ({ style }: { style?: any }) => {
  const opacity = useSharedValue(0.6);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 800 }),
      -1,
      true
    );
  }, []);

  return <Animated.View style={[styles.skeleton, animatedStyle, style]} />;
};

const MedicalCenterCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Image Skeleton */}
      <Skeleton style={styles.image} />

      {/* Heart icon placeholder (optional) */}
      <View style={styles.heartIcon} />

      {/* Info container */}
      <View style={styles.infoContainer}>
        <Skeleton style={styles.title} />
        <Skeleton style={styles.textLineShort} />
        <Skeleton style={styles.textLine} />
        <View style={styles.rowSpaceBetween}>
          <Skeleton style={styles.rowItem} />
          <Skeleton style={styles.rowItem} />
        </View>
      </View>
    </View>
  );
};

export default MedicalCenterCardSkeleton;
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    margin: 10,
    width: 200,
  },
  skeleton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  image: {
    height: 150,
    width: '100%',
    borderRadius: 0,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 28,
    width: 28,
    backgroundColor: '#ccc',
    borderRadius: 14,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    height: 16,
    width: '70%',
    marginBottom: 8,
  },
  textLineShort: {
    height: 12,
    width: '50%',
    marginBottom: 6,
  },
  textLine: {
    height: 12,
    width: '90%',
    marginBottom: 6,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  rowItem: {
    height: 12,
    width: '40%',
  },
});
