import {
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import React, { ReactNode, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from '../../context/user';
import { Theme } from '../../theme/colors';
import { rspW } from '../../theme/responsive';
import VectorIcons, { IconSets } from '../Icons/VectorIcons';

interface BottomModalProps {
  show?: boolean;
  children: ReactNode;
  onClose: () => void;
  snapPoints?: string[];
  title?: string;
}

const BottomModal = ({
  show,
  children,
  onClose,
  snapPoints = ['25%', '50%'],
  title
}: BottomModalProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (show) {
      bottomSheetModalRef.current?.present();
    }else {
      bottomSheetModalRef.current?.close();
      bottomSheetModalRef.current?.collapse();
    }
  }, [show]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enableDismissOnClose
      onDismiss={onClose}
      >
      <BottomSheetView style={styles.container} >
        <View style={[styles.header, Boolean(title) && styles.border]}>
          {title && <Text style={styles.title}>{title}</Text> }
          <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
            <VectorIcons
              color={theme.black}
              iconSet={IconSets.MaterialCommunityIcons}
              name="close"
              size={rspW(25)}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
        {children}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const style = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      alignItems: 'flex-end',
      height: 50
    },
    title: {
      fontSize: 16,
      color: '#0F0F0F',
      alignSelf:'center',
      padding: 10
    },
    closeContainer: {
      padding: 10,
      marginEnd: 10,
      position:'absolute',
      end: 0
    },
    close: {
      width: rspW(15),
      height: rspW(15),
    },
    border: {
      borderBottomWidth :1,
      borderBottomColor: '#D9D9D9'

    }
  });

export default BottomModal;

