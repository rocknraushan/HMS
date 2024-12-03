import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useCallback} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icons} from '../../assets/icons';
import {useUser} from '../../context/user';
import {RootStackParamList} from '../../navigation/navStrings';
import {
  getQuoteModalAtom,
  getQuoteModalDataAtom,
  wishlistModalAtom,
} from '../../store/atoms';
import {Theme} from '../../theme/colors';
import fontFM from '../../theme/fontFM';
import {rspF, rspW} from '../../theme/responsive';
import StyledButton from '../buttons/StyledButton';
import VectorIcons, {IconSets} from '../Icons/VectorIcons';
import {formatIndianCurrency} from '../../utils/currency';

const GetQuoteModal = () => {
  const {theme} = useUser();
  const styles = style(theme);

  const [show, setQuoteModal] = useAtom(getQuoteModalAtom);
  const [data, setQuoteModalData] = useAtom(getQuoteModalDataAtom);

  const onClose = useCallback(() => {
    setQuoteModalData(undefined);
    setQuoteModal(false);
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
            <Image source={Icons.Success} style={styles.logo} />
            <Text style={styles.title}>Quotation Requested</Text>
            <View style={styles.content}>
              <View style={styles.row}>
                <Text style={styles.item}>Seller Name</Text>
                <Text style={styles.item}>{data?.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.item}>Amount</Text>
                <Text style={styles.item}>
                  {formatIndianCurrency(data?.amount)}
                </Text>
              </View>
            </View>
            <Text style={styles.text}>
              Seller will get back to your request within 3-4 business days
            </Text>
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
      borderRadius: 24,
      width: '100%',
      elevation: 5,
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
      paddingHorizontal: rspW(24),
      marginBottom: 16,
    },
    content: {
      paddingVertical: 16,
      marginVertical: 16,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#EDEDED',
    },
    logo: {
      height: rspW(56),
      width: rspW(56),
      alignSelf: 'center',
      marginVertical: 16,
    },
    title: {
      color: '#474747',

      fontFamily: fontFM.regular,
      fontSize: rspF(16),
      lineHeight: rspF(24),

      textAlign: 'center',
    },
    text: {
      textAlign: 'center',
      fontFamily: fontFM.regular,
      fontSize: rspF(14),
      lineHeight: rspF(21),
      color: '#646464',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 4,
    },
    item: {
      textAlign: 'center',
      fontFamily: fontFM.regular,
      fontSize: rspF(14),
      lineHeight: rspF(18),
      color: theme.black,
    },
  });

export default GetQuoteModal;
