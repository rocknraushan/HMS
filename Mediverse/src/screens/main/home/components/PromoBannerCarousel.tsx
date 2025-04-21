import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { banner, banner2, banner3 } from '../../../../assets';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { rspH, rspW } from '../../../../theme/responsive';

const images = [banner, banner2, banner3];
const width = Dimensions.get('window').width;

const PromoBannerCarousel = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= images.length) {
        nextIndex = 0;
      }
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000); 

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderDot = (index: number) => {
    const animatedDotStyle = useAnimatedStyle(() => {
      const distanceFromCenter = Math.abs(scrollX.value - index * width);
      const dotSize = interpolate(
        distanceFromCenter,
        [0, width],
        [35, 10],
        'clamp'
      );

      return {
        width: withSpring(dotSize),
        backgroundColor: '#fff',
        opacity: currentIndex === index ? withTiming(1) : withTiming(0.5),
      };
    });

    return <Animated.View key={index} style={[styles.dot, animatedDotStyle]} />;
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        onScroll={(event) => {
          scrollX.value = event.nativeEvent.contentOffset.x;
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={item} style={styles.banner} />
        )}
      />
      <View style={styles.dotsContainer}>
        {images.map((_, index) => renderDot(index))}
      </View>
    </View>
  );
};

export default React.memo(PromoBannerCarousel);

const styles = StyleSheet.create({
  banner: {
    width: width - 32,
    aspectRatio: 1.9,
    borderRadius: 16,
    marginTop: 20,
    resizeMode: 'stretch',
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rspH(20),
    position: 'absolute',
    bottom: rspH(9),
    alignSelf: 'center',
  },
  dot: {
    width: rspW(10),
    height: rspW(10),
    borderRadius: rspW(5),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: rspW(5),
  },
});
