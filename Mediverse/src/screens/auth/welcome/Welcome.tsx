import React, { useRef, useState } from 'react';
import { FlatList, Image, LayoutAnimation, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { rspF, rspH, rspW, scrn_height, scrn_width } from '../../../theme/responsive';
import fontFM from '../../../theme/fontFM';
import CButton from '../../../components/CustomButton/CButton';
import { welcomeScreens, WelconDataType } from '../../../data/welcomescr_data';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { navStrings, RootStackParamList } from '../../../navigation/navStrings';
import LandingScreen from './component/LandingScreen';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

type Props = {
  navigation: NavigationProp<RootStackParamList, 'WELCOME'>;
  route: any;
}
const Welcome = ({ navigation, route }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useSharedValue(0);
  const flatlistRef = useRef<FlatList>(null)
  const renderDot = (index: number) => {
    const animatedDotStyle = useAnimatedStyle(() => {
      const distanceFromCenter = Math.abs(scrollX.value - index * scrn_width); // Distance from the center of the screen

      // Interpolate the size of the dot based on how far it is from the center
      const dotSize = interpolate(
        distanceFromCenter,
        [0, scrn_width], // Closer to the current index (0) -> bigger size, farther away -> smaller size
        [30, 10], // Output size range
        'clamp'
      );

      return {
        width: withSpring(dotSize),
        backgroundColor: "#26232F",
        opacity: currentIndex == index ? withTiming(1) : withTiming(0.5)
      };
    });
    return <Animated.View key={index} style={[styles.dot, animatedDotStyle]} />;
  };

  const handleNextPress = () => {
    if (currentIndex < welcomeScreens.length - 1) {
      flatlistRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex((prev) => prev + 1); // Update the current index
    } else {
        navigation.dispatch(
          CommonActions.reset({
          index: 1,
          routes: [{ name:"LOGIN" }],
        }))
    }
  };

  return (
    <View style={styles.cont}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      
      <View style={{ height: '70%' }}>

        <FlatList
          ref={flatlistRef}
          data={welcomeScreens}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }: { item: WelconDataType, index: number }) => <LandingScreen index={index} item={item} />}
          keyExtractor={(item, inex) => item.id.toString()}
          onScroll={(event) => {
            scrollX.value = event.nativeEvent.contentOffset.x;
            const index = Math.round(event.nativeEvent.contentOffset.x / scrn_width);
            setCurrentIndex(index);
          }}
          style={{ height: '100%' }}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
      

      <CButton
        extraStyle={{ marginTop: rspH(24), alignSelf: "center" }}
        title={"Next"}
        onPress={() => handleNextPress()}
      />
      <View style={styles.dotsContainer}>
        {welcomeScreens.map((_, index) => renderDot(index))}
      </View>
      <TouchableOpacity style={styles.skipWraper} onPress={() => navigation.navigate("LOGIN")}>
        <Text style={styles.skiptext}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  skiptext: {
    fontSize: rspF(14),
    color: "rgba(107, 114, 128, 1)",
    fontFamily: fontFM.regular,
    fontWeight:"700",
  },
  skipWraper: {
    padding:8,
    borderRadius:100,
    alignItems:"center",
    justifyContent:'center',
    marginTop:20
  },
  cont_subtext: {
    fontSize: rspF(15),
    color: '#6B7280',
    width: '120%',
    marginTop: rspH(8),
    fontFamily: fontFM.regular,
    textAlign: 'center',
  },
  cont_heading: {
    fontSize: rspF(20),
    fontFamily: fontFM.bold,
    textAlign: 'center',
    color: '#374151',
  },
  content: {
    height: 'auto',
    width: '85%',
    paddingHorizontal: rspW(35),
    marginTop: rspH(29),
    alignItems: 'center',
    alignSelf: 'center',
  },
  content_cont: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  img_cont: {
    height: '61%',
    width: '100%',
    alignSelf: 'center',
  },
  cont: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: rspH(20),
  },
  dot: {
    width: rspW(10),
    height: rspW(10),
    borderRadius: rspW(5),
    backgroundColor: '#9B9B9B',
    marginHorizontal: rspW(5),
  }
});
