import React, { useRef } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { banner, banner2, banner3 } from '../../../../assets';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { rspH, rspW } from '../../../../theme/responsive';

const images = [
    banner,
    banner2,
    banner3,
];

const width = Dimensions.get('window').width;

const PromoBannerCarousel = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
      const scrollX = useSharedValue(0);
      const renderDot = (index: number) => {
        const animatedDotStyle = useAnimatedStyle(() => {
          const distanceFromCenter = Math.abs(scrollX.value - index * width); // Distance from the center of the screen
    
          // Interpolate the size of the dot based on how far it is from the center
          const dotSize = interpolate(
            distanceFromCenter,
            [0, width], // Closer to the current index (0) -> bigger size, farther away -> smaller size
            [35, 10], // Output size range
            'clamp'
          );
    
          return {
            width: withSpring(dotSize),
            backgroundColor: "#fff",
            opacity: currentIndex == index ? withTiming(1) : withTiming(0.5)
          };
        });
        return <Animated.View key={index} style={[styles.dot, animatedDotStyle]} />;
      };
    return(
        <View>
            
    <FlatList
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
)};

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
      }
});
