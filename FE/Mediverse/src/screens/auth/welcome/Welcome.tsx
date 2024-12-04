// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import React, {useState} from 'react';
// import {ImageBackground, Text, View} from 'react-native';
// import FastImage from 'react-native-fast-image';
// import {useDispatch} from 'react-redux';
// import {Handshake, Logo} from '../../../assets';
// import SWrapper from '../../../components/wrappers/SWrapper';
// import {RootStackParamList} from '../../../navigation/navStrings';
// import styles from './styles';
// import { rspH } from '../../../theme/responsive';

// type WelProps = NativeStackScreenProps<RootStackParamList, 'WELCOME'>;

// const Welcome = ({navigation}: WelProps) => {
//   const [process, setprocess] = useState<String>('');

//   const dispatch = useDispatch();

//   return (
//     <SWrapper padHor={0}>
//       <View style={styles.container}>
//         <View style={{alignItems: 'center', width: '100%', height: '30%'}}>
//           <FastImage source={Logo} style={styles.logo} />
//           <Text style={styles.title}>Welcome!</Text>
//         </View>
//         <View style={{alignItems: 'center', width: '100%', height: '75%',paddingBottom:rspH(25)}}>
//           <ImageBackground
//             style={styles.img}
//             source={Handshake}
//             resizeMode="cover">
//             {process !== '' && (
//               <View style={styles.bsCont}>
//                 <Text style={styles.subTitle}>Are you a</Text>
//                 <View style={styles.btn2Cont}>
//                   <StyledButton
//                     label="Buyer"
//                     onPress={() => {
//                       setUserType(UserType.BUYER);
//                       navigation.navigate('LOGIN');
//                     }}
//                     buttonType="SQUARE"
//                   />
//                   <Text style={styles.subTitle2}>or</Text>
//                   <StyledButton
//                     label="Seller"
//                     onPress={() => {
//                       setUserType(UserType.SELLER);
//                       navigation.navigate('LOGIN');
//                     }}
//                     buttonType="SQUARE"
//                   />
//                 </View>
//               </View>
//             )}
//           </ImageBackground>

//           <View style={styles.buttonContainer}>
//             {process === '' && (
//               <>
//                 <StyledButton
//                   label="Sign Up"
//                   onPress={() => setprocess('Sign Up')}
//                   buttonType="RECT"
//                 />
//                 <StyledButton
//                   label="Sign In"
//                   type={2}
//                   onPress={() => setprocess('Sign In')}
//                   buttonType="RECT"
//                 />
//               </>
//             )}
//           </View>
//         </View>
//       </View>
//     </SWrapper>
//   );
// };

// export default Welcome;
