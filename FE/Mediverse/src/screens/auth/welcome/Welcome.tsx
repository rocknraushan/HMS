import React, { useState } from 'react';
import { Image, LayoutAnimation, StatusBar, StyleSheet, Text, View } from 'react-native';
import { rspF, rspH, rspW } from '../../../theme/responsive';
import fontFM from '../../../theme/fontFM';
import CButton from '../../../components/CustomButton/CButton';
import welcomeScreens from '../../../data/welcomescr_data';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { navStrings } from '../../../navigation/navStrings';

const Welcome = () => {
  const navigation = useNavigation()
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    if (currentScreen < welcomeScreens.length - 1) {
        LayoutAnimation.easeInEaseOut()
      setCurrentScreen(currentScreen + 1);
    } else {
      console.log('Navigate to the main app');
      Toast.show({text1:'Login screen',})
      navigation.navigate(navStrings.LOGIN)
      
    }
  };

  const { title, description, image, buttonText } = welcomeScreens[currentScreen];

  return (
    <View style={styles.cont}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <FastImage source={image} style={styles.img_cont} resizeMode="cover" />
      <View style={styles.content_cont}>
        <View style={styles.content}>
          <Text style={styles.cont_heading}>{title}</Text>
          <Text style={styles.cont_subtext}>{description}</Text>
        </View>
        <View style={styles.dotsContainer}>
          {welcomeScreens.map((_, index) => (
            <View key={index} style={[styles.dot, currentScreen === index && styles.activeDot]} />
          ))}
        </View>
        <CButton
          extraStyle={{ marginTop: rspH(24) }}
          title={buttonText}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
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
  },
  activeDot: {
    backgroundColor: '#26232F',
    width: rspW(30),
    height: rspH(8),
  },
});
