import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback} from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import {Icons} from '../../assets/icons';
import {useUser} from '../../context/user';
import {RootStackParamList} from '../../navigation/navStrings';
import {wishlistModalAtom} from '../../store/atoms';
import {Theme} from '../../theme/colors';
import fontFM from '../../theme/fontFM';
import {rspF, rspW} from '../../theme/responsive';
import StyledButton from '../buttons/StyledButton';

const WishlistModal = () => {
  const {theme} = useUser();
  const styles = style(theme);

  const [show, setWishlist] = useAtom(wishlistModalAtom);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPressHome = useCallback(() => {
    setWishlist(false);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'HOME',
        },
      ],
    });
  }, []);

  return (
    // <View style={styles.container}>
    <Modal transparent visible={show}>
      <View
        style={[
          styles.container,
          {
            padding: rspW(24),
          },
        ]}>
        <View style={styles.contentContainer}>
          <View style={styles.body}>
            <Image source={Icons.WishlistIcon} style={styles.logo} />
            <Text style={styles.text}>
              Product Added to Wishlist! Save your favorite finds for later by
              adding them to your wishlist.
            </Text>
            <StyledButton
              label="Home"
              onPress={onPressHome}
              containerStyle={{
                alignSelf: 'center',
                marginVertical: 16,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
    // </View>
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
    },
    body: {
      paddingHorizontal: rspW(24),
      marginBottom: 16,
    },
    logo: {
      height: rspW(34),
      width: rspW(34),
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

export default WishlistModal;
