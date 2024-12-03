// import React, {useCallback, useLayoutEffect} from 'react';
// import {View} from 'react-native';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import SWrapper from '../../../components/wrappers/SWrapper';

// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {Logo} from '../../../assets';
// import {RootStackParamList} from '../../../navigation/navStrings';
// import colors from '../../../theme/colors';
// import styles from './styles';;
// import translate from '../../../localisation/localize';
// import {getUserProfile} from '../../../Services/Signup';
// import {
//   profileDataAtom,
//   userDataAtom,
//   userTypeAtom,
// } from '../../../store/atoms';

// type SplashProps = NativeStackScreenProps<RootStackParamList, 'SPLASH'>;

// const Splash = ({route, navigation}: SplashProps) => {

//   const navigate = useCallback(async () => {
//     const loggedIn =await Storage.isLoggedIn();
//     const language = await Storage.getLanguage();
//     let screen: keyof RootStackParamList = 'WELCOME';

//     if (loggedIn) {
//       const data = await getUser();
//       console.log('DATA', data);

//       if (language) {
//         translate.setLanguage(language);
//         if (!data?.is_gstRegistrationPage) {
//           screen = 'GST_REGISTRATION';
//         } else if (!data?.is_selectCategoriesPage) {
//           screen = 'SELECT_CATEGORIES';
//         } else if (!data?.is_establishPhotosPage) {
//           screen = 'ESTABLISHMENT_PHOTOS';
//         } else {
//           screen = 'HOME';
//         }
//       } else if (!language) {
//         screen = 'SELECT_LANGUAGE';
//       }
//     }

//     // screen = 'GST_REGISTRATION';

//     setTimeout(() => {
//       if (
//         screen === 'SELECT_LANGUAGE' ||
//         screen === 'ESTABLISHMENT_PHOTOS' ||
//         screen === 'SELECT_CATEGORIES'
//       ) {
//         navigation.replace(screen, {
//           hideBack: true,
//         });
//       } else {
//         navigation.replace(screen);
//       }
//     }, 2000);
//   }, []);

//   useLayoutEffect(() => {
//     logoAnim.value = withTiming(1, {duration: 1000});
//     // Storage.clear()
//     navigate();
//   }, []);

//   const logoStyle = useAnimatedStyle(() => {
//     return {
//       opacity: logoAnim.value,
//       transform: [{scale: logoAnim.value}],
//     };
//   });

//   return (
//     <SWrapper
//       hidden={false}
//       statusBarColor={colors.white}
//       barStyle="light-content"
//       padHor={0}>
//       <View style={styles.logoContainer}>
//         <Animated.Image source={Logo} style={[styles.logoImg, logoStyle]} />
//       </View>
//     </SWrapper>
//   );
// };

// export default Splash;
