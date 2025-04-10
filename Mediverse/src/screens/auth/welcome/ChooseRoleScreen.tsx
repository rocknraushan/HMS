// ChooseRoleScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icons } from '../../../assets/icons';

const { width, height } = Dimensions.get('window');

interface Props {
    onProfessionalSelect:()=>void;
    done:()=>void;
}
const ChooseRoleScreen: React.FC<Props> = ({done,onProfessionalSelect}) => {

  return (
    <LinearGradient colors={['#5EC5AE', '#A8E0D3']} style={styles.gradient}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea}>
        {/* Top Right "I'm a Doctor" */}
        <TouchableOpacity
          style={styles.doctorBtn}
          onPress={onProfessionalSelect}
        >
          <Text style={styles.doctorBtnText}>I'm a Doctor</Text>
        </TouchableOpacity>

        {/* Logo Centered */}
        <View style={styles.logoContainer}>
          <Image
            source={Icons.appLogo} // Replace with your local logo path
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Bottom "Get Started" */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.getStartedBtn}
            onPress={done}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ChooseRoleScreen;
const styles = StyleSheet.create({
    gradient: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
      justifyContent: 'space-between',
    },
    doctorBtn: {
      alignSelf: 'flex-end',
      marginTop: 50,
      marginRight: 20,
      backgroundColor: 'rgba(255,255,255,0.3)',
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 20,
    },
    doctorBtnText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },
    logoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: width * 0.5,
      height: height * 0.2,
    },
    bottomContainer: {
      paddingBottom: 40,
      alignItems: 'center',
    },
    getStartedBtn: {
      backgroundColor: '#fff',
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
    },
    getStartedText: {
      color: '#5EC5AE',
      fontWeight: '600',
      fontSize: 16,
    },
  });
  