import React, {ReactNode, useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Theme} from '../../theme/colors';
import {useUser} from '../../context/user';
import BottomModal from './BottomModal';
import {rspF} from '../../theme/responsive';
import fontFM from '../../theme/fontFM';
import ItemSeparatorComponent from '../ItemSeparatorComponent';

export interface BottomListItem {
  label: string;
  icon?: ReactNode;
}

interface BottomModalProps {
  show?: boolean;
  onClose: () => void;
  snapPoints?: string[];
  list: BottomListItem[];

  onPressItem: (item: BottomListItem, index: number) => void;
  title?: string;
}

interface ListItemProps {
  data: BottomListItem;
  onPress: (item: BottomListItem, index: number) => void;
  index: number;
}

const ListItem = ({data, index, onPress}: ListItemProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  const onPressItem = useCallback(() => {
    onPress(data, index);
  }, [data, index]);

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPressItem}>
      {data.icon && <View style={styles.icon}>{data?.icon}</View>}
      <Text style={styles.label}>{data.label}</Text>
    </TouchableOpacity>
  );
};

const BottomListModal = ({
  show,
  onClose,
  snapPoints = ['25%', '50%'],
  list,
  onPressItem,
  title,
}: BottomModalProps) => {
  const {theme} = useUser();
  const styles = style(theme);
  return (
    <BottomModal show={show} snapPoints={snapPoints} onClose={onClose}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={list}
        keyExtractor={item => item.label}
        renderItem={({item, index}) => {
          return <ListItem data={item} index={index} onPress={onPressItem} />;
        }}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </BottomModal>
  );
};

const style = (theme: Theme) =>
  StyleSheet.create({
    title: {
      fontSize: rspF(16),
      fontFamily: fontFM.regular,
      color: theme.black,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: 8
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
    },
    label: {
      fontSize: rspF(16),
      fontFamily: fontFM.regular,
      color: theme.black,
    },
    icon: {
      marginEnd: 8,
    },
  });
export default BottomListModal;
