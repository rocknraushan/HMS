import React, {useCallback} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUser} from '../../context/user';
import {Theme} from '../../theme/colors';
import {rspF, rspH, rspW} from '../../theme/responsive';
import VectorIcons, {IconSets} from '../Icons/VectorIcons';
import fontFM from '../../theme/fontFM';
import {Logo} from '../../assets';
import {useAtom, useAtomValue} from 'jotai';
import {userTypeAtom, welcomModalAtom} from '../../store/atoms';
import {UserType} from '../../interfaces/User';

const WelcomeModal = () => {
  const {theme} = useUser();
  const styles = style(theme);

  const [show, setWelcome] = useAtom(welcomModalAtom);

  const userType = useAtomValue(userTypeAtom);

  const onClose = useCallback(() => {
    setWelcome(false);
  }, []);

  return (
    <View style={styles.container}>
      <Modal transparent visible={show}>
        <View
          style={[
            styles.container,
            {
              padding: rspW(24),
            },
          ]}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
                <VectorIcons
                  color={theme.black}
                  iconSet={IconSets.MaterialCommunityIcons}
                  name="close"
                  size={rspW(25)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.body}>
              <Text style={styles.title}>Welcome!</Text>
              <Image source={Logo} style={styles.logo} />
              {userType === UserType.BUYER ? (
                <Text style={styles.text}>
                  Congratulations! By verifying your identity, you've increased
                  your business potential and also expanded your network as a
                  valued Buyer on HeyHari. Ready to grow together? Let's get
                  started!
                </Text>
              ) : (
                <Text style={styles.text}>
                  You're now officially part of our community of sellers and
                  empowered entrepreneurs. Get ready to revolutionize your sales
                  experience with our intuitive tools and resources.
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const style = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      backgroundColor: theme.white,
      borderRadius: 8,
      width: '100%',
      elevation: 2,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    header: {
      alignItems: 'flex-end',
    },
    closeContainer: {
      padding: rspW(10),
    },
    body: {
      paddingHorizontal: rspW(12),
      marginBottom: 16,
    },
    title: {
      textAlign: 'center',
      color: theme.black,
      fontFamily: fontFM.bold,
      fontSize: rspF(24),
    },
    logo: {
      height: rspW(100),
      width: rspW(100),
      alignSelf: 'center',
      marginVertical: 16,
    },
    text: {
      textAlign: 'center',
      color: theme.black,
      fontFamily: fontFM.regular,
      fontSize: rspF(16),
      lineHeight: rspF(24),
    },
  });

export default WelcomeModal;
