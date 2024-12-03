import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useUser} from '../../context/user';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const ItemSeparatorComponent = ({style}: Props) => {
  const {theme} = useUser();
  return (
    <View
      style={[
        {
          borderBottomColor: theme.grey,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
        style,
      ]}
    />
  );
};
export default ItemSeparatorComponent;
